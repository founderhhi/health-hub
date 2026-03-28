import { Router } from 'express';
import Stripe from 'stripe';
import { db } from '../db';
import { requireAuth, requireRole } from '../middleware/auth';

const STRIPE_SECRET_KEY = process.env['STRIPE_SECRET_KEY'] || '';

// Initialise Stripe only when a key is present so the server boots without it
const stripe = STRIPE_SECRET_KEY
  ? new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2026-02-25.clover' })
  : null;

function requireStripe(res: any): boolean {
  if (!stripe) {
    res.status(503).json({ error: 'Payment service not configured' });
    return false;
  }
  return true;
}

export const paymentsRouter = Router();

// ── helpers ───────────────────────────────────────────────────────────────────

async function getOrCreateCustomer(userId: string, phone: string): Promise<string> {
  const result = await db.query(
    `select stripe_customer_id from patient_profiles where user_id = $1`,
    [userId]
  );

  if (result.rows[0]?.stripe_customer_id) {
    return result.rows[0].stripe_customer_id;
  }

  const customer = await stripe!.customers.create({
    phone,
    metadata: { userId },
  });

  await db.query(
    `insert into patient_profiles (user_id, stripe_customer_id)
     values ($1, $2)
     on conflict (user_id) do update set stripe_customer_id = $2`,
    [userId, customer.id]
  );

  return customer.id;
}

// ── SetupIntent (save card without charging) ──────────────────────────────────

/**
 * POST /payments/setup-intent
 * Creates a Stripe SetupIntent so the client can securely save a card.
 * Returns { clientSecret } — pass this to stripe.confirmCardSetup().
 */
paymentsRouter.post('/setup-intent', requireAuth, requireRole(['patient']), async (req, res) => {
  if (!requireStripe(res)) return;
  try {
    const user = (req as any).user;
    const customerId = await getOrCreateCustomer(user.userId, user.phone);

    const setupIntent = await stripe!.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
      usage: 'off_session',
    });

    return res.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    console.error('Create setup intent error', error);
    return res.status(500).json({ error: 'Unable to create setup intent' });
  }
});

/**
 * POST /payments/confirm-setup
 * After stripe.confirmCardSetup() succeeds on the client, call this to
 * save the Stripe PaymentMethod to our own payment_methods table.
 * Body: { paymentMethodId, makeDefault }
 */
paymentsRouter.post('/confirm-setup', requireAuth, requireRole(['patient']), async (req, res) => {
  if (!requireStripe(res)) return;
  try {
    const user = (req as any).user;
    const { paymentMethodId, makeDefault = false } = req.body as {
      paymentMethodId: string;
      makeDefault?: boolean;
    };

    if (!paymentMethodId) {
      return res.status(400).json({ error: 'paymentMethodId is required' });
    }

    const pm = await stripe!.paymentMethods.retrieve(paymentMethodId);
    if (!pm.card) {
      return res.status(400).json({ error: 'Payment method has no card data' });
    }

    const client = await db.connect();
    try {
      await client.query('BEGIN');

      if (makeDefault) {
        await client.query(
          `update patient_payment_methods set is_default = false where user_id = $1`,
          [user.userId]
        );
      }

      const countResult = await client.query(
        `select count(*) from patient_payment_methods where user_id = $1`,
        [user.userId]
      );
      const isFirstCard = parseInt(countResult.rows[0].count, 10) === 0;

      const expMonth = String(pm.card.exp_month).padStart(2, '0');
      const expYear = String(pm.card.exp_year).slice(-2);

      const insert = await client.query(
        `insert into patient_payment_methods
           (user_id, card_brand, card_last4, card_expiry, card_holder, is_default, stripe_payment_method_id)
         values ($1, $2, $3, $4, $5, $6, $7)
         returning *`,
        [
          user.userId,
          pm.card.brand,
          pm.card.last4,
          `${expMonth}/${expYear}`,
          pm.billing_details?.name || null,
          makeDefault || isFirstCard,
          pm.id,
        ]
      );

      await client.query('COMMIT');
      return res.status(201).json({ paymentMethod: insert.rows[0] });
    } catch (err) {
      await client.query('ROLLBACK').catch(() => {});
      throw err;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Confirm setup error', error);
    return res.status(500).json({ error: 'Unable to save payment method' });
  }
});

// ── PaymentIntent (charge a saved card) ───────────────────────────────────────

/**
 * POST /payments/payment-intent
 * Creates a Stripe PaymentIntent for a service charge.
 * Body: { amountCents, currency?, description?, serviceType? }
 * Returns { clientSecret }
 */
paymentsRouter.post('/payment-intent', requireAuth, requireRole(['patient']), async (req, res) => {
  if (!requireStripe(res)) return;
  try {
    const user = (req as any).user;
    const {
      amountCents,
      currency = 'gbp',
      description,
      serviceType,
    } = req.body as {
      amountCents: number;
      currency?: string;
      description?: string;
      serviceType?: string;
    };

    if (!amountCents || amountCents < 50) {
      return res.status(400).json({ error: 'Amount must be at least 50 pence' });
    }

    const customerId = await getOrCreateCustomer(user.userId, user.phone);

    const paymentIntent = await stripe!.paymentIntents.create({
      amount: amountCents,
      currency: currency.toLowerCase(),
      customer: customerId,
      description: description || undefined,
      metadata: { userId: user.userId, serviceType: serviceType || 'other' },
      automatic_payment_methods: { enabled: true },
    });

    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Create payment intent error', error);
    return res.status(500).json({ error: 'Unable to create payment intent' });
  }
});

/**
 * POST /payments/confirm-payment
 * After the client confirms a PaymentIntent, record the transaction.
 * Body: { paymentIntentId, serviceType?, description? }
 */
paymentsRouter.post('/confirm-payment', requireAuth, requireRole(['patient']), async (req, res) => {
  if (!requireStripe(res)) return;
  try {
    const user = (req as any).user;
    const { paymentIntentId, serviceType, description } = req.body as {
      paymentIntentId: string;
      serviceType?: string;
      description?: string;
    };

    if (!paymentIntentId) {
      return res.status(400).json({ error: 'paymentIntentId is required' });
    }

    const pi = await stripe!.paymentIntents.retrieve(paymentIntentId);
    if (pi.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment has not succeeded' });
    }

    let cardLast4: string | null = null;
    if (pi.payment_method) {
      try {
        const pm = await stripe!.paymentMethods.retrieve(pi.payment_method as string);
        cardLast4 = pm.card?.last4 || null;
      } catch {
        // non-critical — continue without card details
      }
    }

    const insert = await db.query(
      `insert into payment_transactions
         (user_id, amount_cents, currency, description, service_type, status, card_last4, stripe_payment_intent_id)
       values ($1, $2, $3, $4, $5, 'completed', $6, $7)
       returning *`,
      [
        user.userId,
        pi.amount,
        pi.currency.toUpperCase(),
        description || pi.description || null,
        serviceType || 'other',
        cardLast4,
        pi.id,
      ]
    );

    return res.json({ transaction: insert.rows[0] });
  } catch (error) {
    console.error('Confirm payment error', error);
    return res.status(500).json({ error: 'Unable to record payment' });
  }
});

/**
 * GET /payments/publishable-key
 * Returns the Stripe publishable key for the frontend (safe to expose).
 */
paymentsRouter.get('/publishable-key', requireAuth, (_req, res) => {
  const key = process.env['STRIPE_PUBLISHABLE_KEY'] || '';
  return res.json({ publishableKey: key });
});

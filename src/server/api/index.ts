import { Router } from 'express';
import { authRouter } from './auth';
import { patientRouter } from './patient';
import { gpRouter } from './gp';
import { prescriptionsRouter } from './prescriptions';
import { pharmacyRouter } from './pharmacy';
import { referralsRouter } from './referrals';
import { labsRouter } from './labs';
import { notificationsRouter } from './notifications';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.json({ ok: true });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/patient', patientRouter);
apiRouter.use('/gp', gpRouter);
apiRouter.use('/prescriptions', prescriptionsRouter);
apiRouter.use('/pharmacy', pharmacyRouter);
apiRouter.use('/referrals', referralsRouter);
apiRouter.use('/labs', labsRouter);
apiRouter.use('/notifications', notificationsRouter);

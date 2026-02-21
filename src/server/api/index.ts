import { Router, Request, Response } from 'express';
import { authRouter } from './auth';
import { patientRouter } from './patient';
import { gpRouter } from './gp';
import { prescriptionsRouter } from './prescriptions';
import { pharmacyRouter } from './pharmacy';
import { referralsRouter } from './referrals';
import { labsRouter } from './labs';
import { notificationsRouter } from './notifications';
import { chatRouter } from './chat';
import { adminRouter } from './admin';

export const apiRouter = Router();

const healthHandler = (_req: Request, res: Response) => {
  res.json({ ok: true, status: 'ok' });
};

apiRouter.get('/health', healthHandler);
apiRouter.get('/healthz', healthHandler);

apiRouter.use('/auth', authRouter);
apiRouter.use('/patient', patientRouter);
apiRouter.use('/gp', gpRouter);
apiRouter.use('/prescriptions', prescriptionsRouter);
apiRouter.use('/pharmacy', pharmacyRouter);
apiRouter.use('/referrals', referralsRouter);
apiRouter.use('/labs', labsRouter);
apiRouter.use('/notifications', notificationsRouter);
apiRouter.use('/chat', chatRouter);
apiRouter.use('/admin', adminRouter);

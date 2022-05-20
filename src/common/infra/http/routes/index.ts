import { Router } from 'express';
import userRouter from '@modules/user/infra/http/routes/UserRouter';

const routes = Router();

routes.use('/users', userRouter);

export default routes;

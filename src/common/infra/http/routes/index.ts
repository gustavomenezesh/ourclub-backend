import { Router } from 'express';
import userRouter from '@modules/user/infra/http/routes/UserRouter';
import categoryRouter from '@modules/category/infra/http/routes/CategoryRouter';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/categories', categoryRouter);

export default routes;

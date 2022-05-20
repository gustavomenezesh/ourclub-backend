import { Router } from 'express';
import UserController from '@modules/user/infra/http/controllers/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', userController.create);

export default userRouter;

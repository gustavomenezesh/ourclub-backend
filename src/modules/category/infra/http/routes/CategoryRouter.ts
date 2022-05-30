import { Router } from 'express';
import CategoryController from '@modules/category/infra/http/controllers/CategoryController';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/', categoryController.create);

export default categoryRouter;

import { Router } from 'express';
import CategoryController from '@modules/category/infra/http/controllers/CategoryController';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.post('/', categoryController.create);
categoryRouter.get('/', categoryController.list);

categoryRouter.patch('/:categoryId', categoryController.update);
categoryRouter.delete('/:categoryId', categoryController.delete);

export default categoryRouter;

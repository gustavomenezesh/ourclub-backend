import { Router } from 'express';
import SubCategoryController from '@modules/subcategory/infra/http/controllers/SubCategoryController';

const subCategoryRouter = Router();
const subCategoryController = new SubCategoryController();

subCategoryRouter.get('/', subCategoryController.list);
subCategoryRouter.post('/', subCategoryController.create);
subCategoryRouter.patch('/:subcategoryId', subCategoryController.update);
subCategoryRouter.delete('/:subcategoryId', subCategoryController.delete);

export default subCategoryRouter;

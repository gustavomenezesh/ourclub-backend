import { Router } from 'express';
import SubCategoryController from '@modules/subcategory/infra/http/controllers/SubCategoryController';

const subCategoryRouter = Router();
const subCategoryController = new SubCategoryController();

subCategoryRouter.post('/', subCategoryController.create);

export default subCategoryRouter;

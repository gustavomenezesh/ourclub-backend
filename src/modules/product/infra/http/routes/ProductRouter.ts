import { Router } from 'express';
import ProductController from '@modules/product/infra/http/controllers/ProductController';
import uploader from '@common/infra/http/middlewares/UploadHandler';

const productRouter = Router();
const productController = new ProductController();

productRouter.post('/', [uploader.array('file')], productController.create);
productRouter.get('/', productController.list);
productRouter.get('/:product', productController.get);

export default productRouter;

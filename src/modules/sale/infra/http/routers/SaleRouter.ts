import { Router } from 'express';
import SaleController from '@modules/sale/infra/http/controllers/SaleController';

const saleRouter = Router();
const saleController = new SaleController();

saleRouter.post('/', saleController.create);
saleRouter.get('/', saleController.list);
saleRouter.patch('/:delivery', saleController.update);

export default saleRouter;

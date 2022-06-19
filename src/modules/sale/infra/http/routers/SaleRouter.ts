import { Router } from 'express';
import SaleController from '@modules/sale/infra/http/controllers/SaleController';
import AuthMiddleware from '@common/infra/http/middlewares/AuthenticationHandler';

const saleRouter = Router();
const saleController = new SaleController();

saleRouter.post('/', [AuthMiddleware.required], saleController.create);

export default saleRouter;

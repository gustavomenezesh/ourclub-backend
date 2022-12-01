import { Router } from 'express';
import DeliveryController from '../controllers/DeliveryController';

const deliveryRouter = Router();
const deliveryController = new DeliveryController();

deliveryRouter.get('/:category', deliveryController.list);

export default deliveryRouter;

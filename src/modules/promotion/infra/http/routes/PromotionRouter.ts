import { Router } from 'express';
import PromotionController from '../controllers/PromotionController';

const promotionRouter = Router();
const promotionController = new PromotionController();

promotionRouter.get('/', promotionController.list);
promotionRouter.post('/', promotionController.create);
promotionRouter.patch('/:promotionId', promotionController.update);
promotionRouter.delete('/:promotionId', promotionController.delete);

export default promotionRouter;

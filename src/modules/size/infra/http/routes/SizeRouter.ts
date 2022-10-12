import { Router } from 'express';
import SizeController from '../controllers/SizeController';

const sizeRouter = Router();
const sizeController = new SizeController();

sizeRouter.get('/', sizeController.list);
sizeRouter.post('/', sizeController.create);
sizeRouter.delete('/:sizeId', sizeController.delete);

export default sizeRouter;

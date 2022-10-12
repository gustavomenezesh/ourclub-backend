import { Router } from 'express';
import ImageController from '../controllers/ImageController';

const imageRouter = Router();
const imageController = new ImageController();

imageRouter.get('/', imageController.list);
imageRouter.post('/', imageController.create);
imageRouter.patch('/:imageId', imageController.update);
imageRouter.delete('/:imageId', imageController.delete);

export default imageRouter;

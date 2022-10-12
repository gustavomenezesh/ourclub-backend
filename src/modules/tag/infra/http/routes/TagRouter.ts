import { Router } from 'express';
import TagController from '../controllers/TagController';

const tagRouter = Router();
const tagController = new TagController();

tagRouter.get('/', tagController.list);
tagRouter.post('/', tagController.create);
tagRouter.patch('/:tagId', tagController.update);
tagRouter.delete('/:tagId', tagController.delete);

export default tagRouter;

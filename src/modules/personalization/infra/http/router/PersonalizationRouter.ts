import { Router } from 'express';
import PersonalizationController from '../controllers/PersonalizationController';

const personalizationRouter = Router();
const personalizationController = new PersonalizationController();

personalizationRouter.get('/', personalizationController.list);
personalizationRouter.post('/', personalizationController.create);
personalizationRouter.patch('/:personalizationId', personalizationController.update);
personalizationRouter.delete('/:personalizationId', personalizationController.delete);

export default personalizationRouter;

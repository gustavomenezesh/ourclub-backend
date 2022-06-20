import { Router } from 'express';
import AdressController from '@modules/adress/infra/http/controllers/AdressController';

const adressRouter = Router();
const adressController = new AdressController();

adressRouter.post('/', adressController.create);

export default adressRouter;

import AppContainer from '@common/container';
import ListSubCategoryService from '@modules/subcategory/services/ListSubCategoryService';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';

class DeliveryController {
  public async list(req: Request, res: Response): Promise<Response> {

    const deliveryId = +req.params.sale;
    const createDelivery = AppContainer.resolve<ListSubCategoryService>(ListSubCategoryService);
    const deliveries = await createDelivery.execute(deliveryId);

    return res.status(200).json(instanceToPlain(deliveries));
  }
}

export default DeliveryController;

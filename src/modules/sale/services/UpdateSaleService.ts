import Types from '@common/container/types';
import { inject, injectable } from 'inversify';

import Schema from '@modules/sale/infra/http/validators/UpdateSaleValidator';
import { z } from 'zod';
import IDeliveryRepository from '@modules/delivery/repositories/IDeliveryRepository';
import AppError from '@common/errors/AppError';
import { StatusCodes } from 'http-status-codes';

interface IRequest {
  deliveryId: number;
  data: z.infer<typeof Schema>,
}

@injectable()
class UpdateProductService {
    @inject(Types.DeliveryRepository) private deliveryRepository!: IDeliveryRepository;

    public async execute({ deliveryId, data }: IRequest): Promise<void> {
      const deliveryFound = await this.deliveryRepository.find({ id: deliveryId });

      if (deliveryFound) {
        await this.deliveryRepository.update(deliveryFound, data);
      } else {
        throw new AppError('Delivery not found!', StatusCodes.NOT_FOUND);
      }
    }
}

export default UpdateProductService;

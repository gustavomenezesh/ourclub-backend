import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import Delivery from '../infra/typeorm/entities/Delivery';
import IDeliveryRepository from '../repositories/IDeliveryRepository';

@injectable()
class ListDeliveryService {
  @inject(Types.DeliveryRepository) private deliveryRepository!: IDeliveryRepository;

  public async execute(saleId: number): Promise<Delivery[]> {
    const [deliveries] = await this.deliveryRepository.list({ saleId, enabled: true });
    return deliveries;
  }
}

export default ListDeliveryService;

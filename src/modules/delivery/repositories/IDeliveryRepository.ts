import ICreateDeliveryDTO from '../dtos/ICreateDeliveryDTO';
import IUpdateDeliveryDTO from '../dtos/IUpdateDeliveryDTO';
import Delivery from '../infra/typeorm/entities/Delivery';

interface IDeliveryRepository {
  create(data: ICreateDeliveryDTO): Promise<Delivery>;
  list(where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number):
  Promise<[Delivery[], number]>;
  update(sale: Delivery, data: IUpdateDeliveryDTO): Promise<Delivery>;
}

export default IDeliveryRepository;

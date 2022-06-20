import Delivery from '../infra/typeorm/entities/Delivery';

interface IDeliveryRepository {
  list(where?: object | object[],
    relations?: string[],
    take?: number,
    skip?: number):
  Promise<[Delivery[], number]>;
}

export default IDeliveryRepository;

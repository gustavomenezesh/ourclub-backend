import IDeliveryRepository from '@modules/delivery/repositories/IDeliveryRepository';
import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import Delivery from '../entities/Delivery';

@injectable()
class DeliveryRepository implements IDeliveryRepository {
    private ormRepository = getConnection().getRepository(Delivery);

    public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Delivery[], number]> {
        return this.ormRepository.findAndCount({
            where, relations, take, skip,
        });
    }
}

export default DeliveryRepository;

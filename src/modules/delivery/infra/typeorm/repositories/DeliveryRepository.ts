import ICreateDeliveryDTO from '@modules/delivery/dtos/ICreateDeliveryDTO';
import IUpdateDeliveryDTO from '@modules/delivery/dtos/IUpdateDeliveryDTO';
import IDeliveryRepository from '@modules/delivery/repositories/IDeliveryRepository';
import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import Delivery from '../entities/Delivery';

@injectable()
class DeliveryRepository implements IDeliveryRepository {
    private ormRepository = getConnection().getRepository(Delivery);

    public async create(data: ICreateDeliveryDTO): Promise<Delivery> {
      const delivery = this.ormRepository.create(data);
      return this.ormRepository.save(delivery);
    }

    public async list(
      where?: object | object[],
      relations?: string[],
      take?: number,
      skip?: number,
    ): Promise<[Delivery[], number]> {
      return this.ormRepository.findAndCount({
        where, relations, take, skip,
      });
    }

    public async update(delivery: Delivery, data: IUpdateDeliveryDTO): Promise<Delivery> {
      this.ormRepository.merge(delivery, data);
      return this.ormRepository.save(delivery);
    }
}

export default DeliveryRepository;

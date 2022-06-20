import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import Adress from '@modules/adress/infra/typeorm/entities/Adress';
import IAdressRepository from '@modules/adress/repositories/IAdressRepository';

import IUpdateAdressDTO from '@modules/adress/dtos/IUpdateAdressDTO';
import ICreateAdressDTO from '@modules/adress/dtos/ICreateAdressDTO';

@injectable()
class AdressRepository implements IAdressRepository {
  private ormRepository = getConnection().getRepository(Adress);

  public async create(data: ICreateAdressDTO): Promise<Adress> {
    const adress = this.ormRepository.create(data);
    return this.ormRepository.save(adress);
  }

  public async find(where: object | object[], relations?: string[]): Promise<Adress | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Adress[], number]> {
    return this.ormRepository.findAndCount({
      where, relations, take, skip,
    });
  }

  public async update(adress: Adress, data: IUpdateAdressDTO): Promise<Adress> {
    this.ormRepository.merge(adress, data);
    return this.ormRepository.save(adress);
  }

  public async delete(id: number): Promise<boolean> {
    return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
  }
}

export default AdressRepository;

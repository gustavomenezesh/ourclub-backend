import Adress from '@modules/adress/infra/typeorm/entities/Adress';

import IUpdateAdressDTO from '@modules/adress/dtos/IUpdateAdressDTO';
import ICreateAdressDTO from '@modules/adress/dtos/ICreateAdressDTO';

interface IAdressRepository {
  create(data: ICreateAdressDTO): Promise<Adress>;
  find(where: object | object[], relations?: string[]): Promise<Adress | undefined>;
  list(
    where?: object | object[], relations?: string[], take?: number, skip?: number
  ): Promise<[Adress[], number]>;
  update(adress: Adress, data: IUpdateAdressDTO): Promise<Adress>;
  delete(id: number): Promise<boolean>;
}

export default IAdressRepository;

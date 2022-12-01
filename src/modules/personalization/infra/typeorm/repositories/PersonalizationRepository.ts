import ICreatePersonalizationDTO from '@modules/personalization/dtos/ICreatePersonalizationDTO';
import IUpdatePersonalizationDTO from '@modules/personalization/dtos/IUpdatePersonalizationDTO';
import IPersonalizationRepository from '@modules/personalization/repositories/IPersonalizationRepository';
import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import Personalization from '../entities/Personalization';

@injectable()
class PersonalizationRepository implements IPersonalizationRepository {
  private ormRepository = getConnection().getRepository(Personalization);

  public async create(data: ICreatePersonalizationDTO): Promise<Personalization> {
    const personalization = this.ormRepository.create(data);
    return this.ormRepository.save(personalization);
  }

  public async find(where: object | object[], relations?: string[]): Promise<Personalization | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Personalization[], number]> {
    return this.ormRepository.findAndCount({
      where, relations, take, skip,
    });
  }

  public async update(personalization: Personalization, data: IUpdatePersonalizationDTO): Promise<Personalization> {
    this.ormRepository.merge(personalization, data);
    return this.ormRepository.save(personalization);
  }

  public async delete(id: number): Promise<boolean> {
    return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
  }
}

export default PersonalizationRepository;

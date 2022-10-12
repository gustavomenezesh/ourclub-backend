import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import Profile from '@modules/user/infra/typeorm/entities/Profile';
import IProfileRepository from '@modules/user/repositories/IProfileRepository';

import IUpdateProfileDTO from '@modules/user/dtos/IUpdateProfileDTO';
import ICreateProfileDTO from '@modules/user/dtos/ICreateProfileDTO';

@injectable()
class ProfileRepository implements IProfileRepository {
  private ormRepository = getConnection().getRepository(Profile);

  public async create(data: ICreateProfileDTO): Promise<Profile> {
    const profile = this.ormRepository.create(data);
    return this.ormRepository.save(profile);
  }

  public async find(where: object | object[], relations?: string[]): Promise<Profile | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[Profile[], number]> {
    return this.ormRepository.findAndCount({
      where, relations, take, skip,
    });
  }

  public async update(profile: Profile, data: IUpdateProfileDTO): Promise<Profile> {
    this.ormRepository.merge(profile, data);
    return this.ormRepository.save(profile);
  }

  public async delete(id: number): Promise<boolean> {
    return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
  }
}

export default ProfileRepository;

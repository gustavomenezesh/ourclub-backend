import { getConnection } from 'typeorm';
import { injectable } from 'inversify';

import User from '@modules/user/infra/typeorm/entities/User';
import IUserRepository from '@modules/user/repositories/IUserRepository';

import IUpdateUserDTO from '@modules/user/dtos/IUpdateUserDTO';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

@injectable()
class UserRepository implements IUserRepository {
  private ormRepository = getConnection().getRepository(User);

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    return this.ormRepository.save(user);
  }

  public async find(where: object | object[], relations?: string[]): Promise<User | undefined> {
    return this.ormRepository.findOne({ where, relations });
  }

  public async list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[User[], number]> {
    return this.ormRepository.findAndCount({
      where, relations, take, skip,
    });
  }

  public async update(user: User, data: IUpdateUserDTO): Promise<User> {
    this.ormRepository.merge(user, data);
    return this.ormRepository.save(user);
  }

  public async delete(id: number): Promise<boolean> {
    return this.ormRepository.delete({ id }).then(() => true).catch(() => false);
  }
}

export default UserRepository;

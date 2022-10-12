import User from '@modules/user/infra/typeorm/entities/User';

import IUpdateUserDTO from '@modules/user/dtos/IUpdateUserDTO';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  find(where: object | object[], relations?: string[]): Promise<User | undefined>;
  list(where?: object | object[], relations?: string[], take?: number, skip?: number): Promise<[User[], number]>;
  update(user: User, data: IUpdateUserDTO): Promise<User>;
  delete(id: number): Promise<boolean>;
}

export default IUserRepository;

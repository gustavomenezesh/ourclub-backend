import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import * as argon2 from 'argon2';

import Schema from '@modules/user/infra/http/validators/CreateUserValidator';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IProfileRepository from '@modules/user/repositories/IProfileRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  data: Z.infer<typeof Schema>,
}

@injectable()
class CreateUserService {
  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  @inject(Types.ProfileRepository) private profileRepository!: IProfileRepository;

  public async execute({ data }: IRequest): Promise<User> {
    const profile = await this.profileRepository.find({ id: data.role === 'ADM' ? 1 : 2 });

    const user: ICreateUserDTO = {
      profileId: profile?.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      password: await argon2.hash(data.secret),
    };

    return this.userRepository.create(user);
  }
}

export default CreateUserService;

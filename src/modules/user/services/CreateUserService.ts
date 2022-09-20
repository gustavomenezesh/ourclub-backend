import Types from '@common/container/types';
import { inject, injectable } from 'inversify';
import * as Z from 'zod';
import * as argon2 from 'argon2';

import Schema from '@modules/user/infra/http/validators/CreateUserValidator';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IProfileRepository from '@modules/user/repositories/IProfileRepository';
import IAdressRepository from '@modules/adress/repositories/IAdressRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  data: Z.infer<typeof Schema>,
}

@injectable()
class CreateUserService {
  @inject(Types.AdressRepository) private adressRepository!: IAdressRepository;

  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  @inject(Types.ProfileRepository) private profileRepository!: IProfileRepository;

  public async execute({ data }: IRequest): Promise<User> {
    const profile = await this.profileRepository.find({ description: data.role });

    const user: ICreateUserDTO = {
      profileId: profile?.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      gender: data.gender,
      password: await argon2.hash(data.secret),
    };

    const userCreated = await this.userRepository.create(user);

    const adress = {
      userId: userCreated.id,
      cep: data.cep,
      state: data.state,
      city: data.city,
      district: data.district,
      street: data.street,
      number: data.number,
      complement: data?.complement,
      main: true,
    };

    await this.adressRepository.create(adress);

    return userCreated;
  }
}

export default CreateUserService;

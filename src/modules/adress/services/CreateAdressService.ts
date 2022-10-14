import { inject, injectable } from 'inversify';
import * as Z from 'zod';

import AppError from '@common/errors/AppError';
import Types from '@common/container/types';

import Schema from '@modules/adress/infra/http/validators/CreateAdressValidator';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IAdressRepository from '../repositories/IAdressRepository';
import Adress from '../infra/typeorm/entities/Adress';

interface IRequest {
  data: Z.infer<typeof Schema>;
}

@injectable()
class LoginService {
  @inject(Types.UserRepository) private userRepository!: IUserRepository;

  @inject(Types.AdressRepository) private adressRepository!: IAdressRepository;

  public async execute({ data }: IRequest): Promise<Adress> {
    const userFound = await this.userRepository.find({ id: data.userId });
    if (!userFound) throw new AppError('User not found', 404);

    const adress = await this.adressRepository.create({ ...data, main: false });
    return adress;
  }
}

export default LoginService;

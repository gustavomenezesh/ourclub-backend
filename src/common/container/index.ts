import { Container } from 'inversify';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import IProfileRepository from '@modules/user/repositories/IProfileRepository';
import ProfileRepository from '@modules/user/infra/typeorm/repositories/ProfileRepository';
import IAdressRepository from '@modules/adress/repositories/IAdressRepository';
import AdressRepository from '@modules/adress/infra/repostories/AdressRepository';
import Types from './types';

// import Types from '@common/container/types';

const container = new Container();

container.bind<IUserRepository>(Types.UserRepository).to(UserRepository);
container.bind<IProfileRepository>(Types.ProfileRepository).to(ProfileRepository);
container.bind<IAdressRepository>(Types.AdressRepository).to(AdressRepository);

export default container;

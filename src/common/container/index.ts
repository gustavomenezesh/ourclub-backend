import AdressRepository from '@modules/adress/infra/repostories/AdressRepository';
import IAdressRepository from '@modules/adress/repositories/IAdressRepository';
import CategoryRepository from '@modules/category/infra/typeorm/repositories/CategoryRepository';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import SizeRepository from '@modules/size/infra/typeorm/repositories/SizeRepository';
import ISizeRepository from '@modules/size/repositories/ISizeRepository';
import SubCategoryRepository from '@modules/subcategory/infra/typeorm/repositories/SubCategoryRepository';
import ISubCategoryRepository from '@modules/subcategory/repositories/ISubCategoryRepository';
import ProfileRepository from '@modules/user/infra/typeorm/repositories/ProfileRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IProfileRepository from '@modules/user/repositories/IProfileRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { Container } from 'inversify';
import Types from './types';

// import Types from '@common/container/types';

const container = new Container();

container.bind<IUserRepository>(Types.UserRepository).to(UserRepository);
container.bind<IProfileRepository>(Types.ProfileRepository).to(ProfileRepository);
container.bind<IAdressRepository>(Types.AdressRepository).to(AdressRepository);
container.bind<ICategoryRepository>(Types.CategoryRepository).to(CategoryRepository);
container.bind<ISubCategoryRepository>(Types.CategoryRepository).to(SubCategoryRepository);
container.bind<ISizeRepository>(Types.CategoryRepository).to(SizeRepository);

export default container;

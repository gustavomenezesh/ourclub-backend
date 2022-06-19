import StorageProvider from '@common/providers/StorageProvider/implementations/LocalStorageProvider';
import IStorageProvider from '@common/providers/StorageProvider/repositories/IStorageProvider';
import AdressRepository from '@modules/adress/infra/repostories/AdressRepository';
import IAdressRepository from '@modules/adress/repositories/IAdressRepository';
import CategoryRepository from '@modules/category/infra/typeorm/repositories/CategoryRepository';
import ICategoryRepository from '@modules/category/repositories/ICategoryRepository';
import DeliveryRepository from '@modules/delivery/infra/typeorm/repositories/DeliveryRepository';
import IDeliveryRepository from '@modules/delivery/repositories/IDeliveryRepository';
import ImageRepository from '@modules/image/infra/typeorm/repositories/ImageRepository';
import IImageRepository from '@modules/image/repositories/IImageRepository';
import PersonalizationRepository from '@modules/personalization/infra/typeorm/repositories/PersonalizationRepository';
import IPersonalizationRepository from '@modules/personalization/repositories/IPersonalizationRepository';
import ProductRepository from '@modules/product/infra/typeorm/repositories/ProductRepository';
import IProductRepository from '@modules/product/repositories/IProductRepository';
import SaleProductRepository from '@modules/sale/infra/typeorm/repositories/SaleProductRepository';
import SaleRepository from '@modules/sale/infra/typeorm/repositories/SaleRepository';
import ISaleProductRepository from '@modules/sale/repositories/ISaleProductRepository';
import ISaleRepository from '@modules/sale/repositories/ISaleRepository';
import SizeRepository from '@modules/size/infra/typeorm/repositories/SizeRepository';
import ISizeRepository from '@modules/size/repositories/ISizeRepository';
import SubCategoryRepository from '@modules/subcategory/infra/typeorm/repositories/SubCategoryRepository';
import ISubCategoryRepository from '@modules/subcategory/repositories/ISubCategoryRepository';
import TagRepository from '@modules/tag/infra/typeorm/repositories/TagRepository';
import ITagRepository from '@modules/tag/repositories/ITagRepository';
import ProfileRepository from '@modules/user/infra/typeorm/repositories/ProfileRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IProfileRepository from '@modules/user/repositories/IProfileRepository';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import { Container } from 'inversify';
import Types from './types';

// import Types from '@common/container/types';

const container = new Container();

container.bind<IUserRepository>(Types.UserRepository).to(UserRepository);
container.bind<IProductRepository>(Types.ProductRepository).to(ProductRepository);
container.bind<IProfileRepository>(Types.ProfileRepository).to(ProfileRepository);
container.bind<IAdressRepository>(Types.AdressRepository).to(AdressRepository);
container.bind<ICategoryRepository>(Types.CategoryRepository).to(CategoryRepository);
container.bind<ISaleRepository>(Types.SaleRepository).to(SaleRepository);
container.bind<ISaleProductRepository>(Types.SaleProductRepository).to(SaleProductRepository);
container.bind<ISubCategoryRepository>(Types.SubCategoryRepository).to(SubCategoryRepository);
container.bind<ISizeRepository>(Types.SizeRepository).to(SizeRepository);
container.bind<IImageRepository>(Types.ImageRepository).to(ImageRepository);
container.bind<ITagRepository>(Types.TagRepository).to(TagRepository);
container.bind<IStorageProvider>(Types.StorageProvider).to(StorageProvider);
container.bind<IPersonalizationRepository>(Types.PersonalizationRepository)
  .to(PersonalizationRepository);
container.bind<IDeliveryRepository>(Types.DeliveryRepository).to(DeliveryRepository);

export default container;

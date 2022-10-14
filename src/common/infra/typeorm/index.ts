import { createConnection } from 'typeorm';
import DatabaseConfig from '@config/DataBaseConfig';
import User from '@modules/user/infra/typeorm/entities/User';
import Profile from '@modules/user/infra/typeorm/entities/Profile';
import Adress from '@modules/adress/infra/typeorm/entities/Adress';
import Category from '@modules/category/infra/typeorm/entities/Category';
import SubCategory from '@modules/subcategory/infra/typeorm/entities/SubCategory';
import Image from '@modules/image/infra/typeorm/entities/Image';
import Size from '@modules/size/infra/typeorm/entities/Size';
import Tag from '@modules/tag/infra/typeorm/entities/Tag';
import Product from '@modules/product/infra/typeorm/entities/Product';
import Sale from '@modules/sale/infra/typeorm/entities/Sale';
import SaleProduct from '@modules/sale/infra/typeorm/entities/SaleProducts';
import Personalization from '@modules/personalization/infra/typeorm/entities/Personalization';
import Delivery from '@modules/delivery/infra/typeorm/entities/Delivery';
import Promotion from '@modules/promotion/infra/typeorm/entities/Promotion';

createConnection({
  type: 'postgres',
  host: DatabaseConfig.host,
  username: DatabaseConfig.username,
  password: DatabaseConfig.password,
  database: DatabaseConfig.database,
  port: DatabaseConfig.port,
  entities: [
    User,
    Product,
    Profile,
    Adress,
    Category,
    SubCategory,
    Sale,
    SaleProduct,
    Image,
    Size,
    Tag,
    Personalization,
    Delivery,
    Promotion,
  ],
  synchronize: false,
  logging: DatabaseConfig.logging,
  ssl: DatabaseConfig.ssl,
  extra: {
    ssl: DatabaseConfig.ssl ? {
      rejectUnauthorized: false,
    } : undefined,
  },
}).then(() => {
  console.log('Database connected sucessfully');
}).catch((error) => {
  console.log(`Could not connect to database with erro: ${error}`);
});

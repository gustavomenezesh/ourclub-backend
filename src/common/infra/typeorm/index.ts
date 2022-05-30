import { createConnection } from 'typeorm';
import DatabaseConfig from '@config/DataBaseConfig';
import User from '@modules/user/infra/typeorm/entities/User';
import Profile from '@modules/user/infra/typeorm/entities/Profile';
import Adress from '@modules/adress/infra/typeorm/entities/Adress';
import Category from '@modules/category/infra/typeorm/entities/Category';

createConnection({
  type: 'postgres',
  host: DatabaseConfig.host,
  username: DatabaseConfig.username,
  password: DatabaseConfig.password,
  database: DatabaseConfig.database,
  port: DatabaseConfig.port,
  entities: [
    User,
    Profile,
    Adress,
    Category,
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

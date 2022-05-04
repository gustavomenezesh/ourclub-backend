import { createConnection } from 'typeorm';
import DatabaseConfig from '@config/DataBaseConfig';
import User from '@modules/user/infra/typeorm/entities/User';
import Profile from '@modules/user/infra/typeorm/entities/Profile';

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

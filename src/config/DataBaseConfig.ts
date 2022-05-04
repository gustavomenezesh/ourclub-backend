import 'dotenv/config';

interface IDatabaseConfig {
  type: 'mysql' | 'mariadb' | 'postgres' | 'cockroachdb' | 'sqlite' | 'mssql' | 'sap' | 'oracle' | 'cordova' | 'nativescript' | 'react-native' | 'sqljs' | 'mongoDATABASE' | 'aurora-data-api' | 'aurora-data-api-pg' | 'expo' | 'better-sqlite3';
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
  logging: boolean;
  ssl: boolean;
}

const databaseConfig: IDatabaseConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USER || 'ourclub-backend',
  password: process.env.DATABASE_PASSWORD || 'ourclub-backend',
  database: process.env.DATABASE_DATABASE || 'ourclub-backend',
  port: Number(process.env.DATABASE_PORT || 5432),
  logging: process.env.DATABASE_LOGGING === 'true',
  ssl: process.env.DATABASE_SSL === 'true',
};

export default databaseConfig as IDatabaseConfig;

import "dotenv/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "../constants/environment";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + "/../**/entities/*.entity.{js,ts}"],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: "migrations",
  migrations: ["dist/migrations/*.{js,ts}"],
  cli: {
    migrationsDir: "src/migrations",
  },
} as DataSourceOptions;

export default OrmConfig;

import { DataSource } from 'typeorm';
import { OrmConfig } from './connection-data-base.config';

const datasource = new DataSource(OrmConfig);
datasource.initialize();
export default datasource;

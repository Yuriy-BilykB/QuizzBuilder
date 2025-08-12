import { DataSource } from 'typeorm';
import { migrationConfig } from './src/config/database.config';

export default new DataSource(migrationConfig);

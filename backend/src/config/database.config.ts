import { config } from 'dotenv';
import { Quizz } from '../modules/quizz/entity/Quizz';
import { Question } from '../modules/quizz/entity/Question';
import { Answer } from '../modules/quizz/entity/Answer';

config();

export const databaseConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Quizz, Question, Answer],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
};

export const migrationConfig = {
  ...databaseConfig,
  migrations: ['src/migrations/*.ts'],
  synchronize: false, 
};

import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as Entities from '../entities/index.js';

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: Object.values(Entities),
    migrations: ['dist/core/database/migrations/*.js'],
    synchronize: false,
    logging: false,
});

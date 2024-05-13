import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env)

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432
});
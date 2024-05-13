// backend/src/config.ts
import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: '192.168.0.14',
  database: 'auth_database',
  password: 'WoPn4ss14Intel!#',
  port: 5432,
});
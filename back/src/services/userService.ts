import { pool } from '../config';
import { User } from '../models/User';

export const userService = {
      async createUser(username: string, password: string, adult: boolean) {
            const result = await pool.query('INSERT INTO users (username, password, user_type, adult) VALUES ($1, $2, $3 $4) RETURNING *', [username, password, 'user', adult]);
            return result.rows[0];
      },

      async getUserById(userId: number): Promise<User> {
            const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
            return result.rows[0];
      },

      async getUserByUsername(username: string): Promise<User> {
            const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            return result.rows[0];
      }
};
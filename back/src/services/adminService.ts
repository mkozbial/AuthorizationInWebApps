import { pool } from '../config';
import { DisplayableUser } from '../models/DisplayableUser';

export const adminService = {
  async getUsers(): Promise<DisplayableUser[]> {
    const result = await pool.query('SELECT user_id, username, user_type FROM users');
    return result.rows;
  },
};
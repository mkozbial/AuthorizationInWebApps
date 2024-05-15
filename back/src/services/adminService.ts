import { pool } from '../config';
import { DisplayableUser } from '../models/DisplayableUser';

export const adminService = {
      async getUsers(): Promise<DisplayableUser[]> {
            const result = await pool.query('SELECT user_id, username, user_type FROM users');
            return result.rows;
      },
      async modifyUser(user_id : number, new_user_type : string) {
            pool.query(`UPDATE users SET user_type = $1 WHERE user_id = $2`, [new_user_type, user_id])
            .then(() => {
                  console.log('User updated successfully');
            })
            .catch((err) => {
                  throw err;
            });

            const result = await pool.query('SELECT user_id, username, user_type FROM users WHERE user_id = $1', [user_id]);
            return result.rows[0];
      },
      async deleteUser(user_id : number) {
            pool.query(`DELETE FROM users WHERE user_id = $1`, [user_id])
            .then(() => {
                  console.log('User deleted successfully');
            })
            .catch((err) => {
                  throw err;
            });

            return {user_id : user_id};
      },
};
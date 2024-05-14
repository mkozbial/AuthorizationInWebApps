import { pool } from '../config';
import { DisplayableUser } from '../models/DisplayableUser';

export const adminService = {
  async getUsers(): Promise<DisplayableUser[]> {
    const result = await pool.query('SELECT user_id, username, user_type FROM users');
    return result.rows;
  },
  async modifyUser(user_id : number, new_user_type : string) {
      const query = {
            text: `UPDATE users
                  SET user_type = $1
                  WHERE user_id = $2`,
            values: [new_user_type, user_id],
          };
          
      pool.query(query)
      
      .then(() => {
            console.log('User updated successfully');
      })
      .catch((err) => {
            throw err;
      });
    },
};
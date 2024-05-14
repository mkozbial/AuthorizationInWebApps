const { Pool } = require('pg');
const readline = require('readline');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432
});

async function createSuperUser() {
      const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
      });

      const username = await new Promise((resolve) => {
            rl.question('Enter username for the super user: ', (answer) => {
                  resolve(answer.trim());
            });
      });

      const password = await new Promise((resolve) => {
            rl.question('Enter password for the super user: ', (answer) => {
                  resolve(answer.trim());
            });
      });

      rl.close();

      try {
            const hashedPassword = await bcryptjs.hash(password, 10);

            console.log(hashedPassword);

            const insertQuery = {
                  text: `INSERT INTO users (username, password, user_type)
                        VALUES ($1, $2, $3)`,
                  values: [username, hashedPassword, 'admin'],
            };

            await pool.query(insertQuery);
            console.log('Super user created successfully.');
      } catch (error) {
            console.error('Error creating super user:', error);
      } finally {
            pool.end();
      }
}

createSuperUser();

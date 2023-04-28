const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();
const connectStr = process.env.PG_URI;
const host = process.env.PG_HOST;
const database = process.env.DATABASE;
const port = process.env.PORT;

const pool = new Pool({
  user: 'postgres',
  host: host,
  database: database,
  password: process.env.DB_PASSWORD.toString(),
  port: port,
});

const getArns = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT table_name
         FROM information_schema.tables
         WHERE table_schema = 'public'
         ORDER BY table_name`,
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          const uniqueArns = [];
          const tablePromises = res.rows.map(async (row) => {
            const tableName = row.table_name;

            try {
              const tableData = await pool.query(
                `SELECT * FROM "${tableName}"`
              );
              for (const nodes of tableData.rows) {
                if (!uniqueArns.includes(nodes.role_arn) && nodes.role_arn)
                  uniqueArns.push(nodes.role_arn);
              }
            } catch (tableErr) {
              console.error(`Error in ${tableName}:`, tableErr);
            }
          });
          Promise.all(tablePromises)
            .then(() => {
              resolve(uniqueArns);
            })
            .catch((error) => {
              reject(error);
            });
        }
      }
    );
  });
};

getArns();

module.exports = { getArns };

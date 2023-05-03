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

const showAllTables = async () => {
  try {
    const tableRes = await pool.query(
      `SELECT table_name
       FROM information_schema.tables
       WHERE table_schema = 'public'
       ORDER BY table_name`
    );
    const tableNames = tableRes.rows.map((row) => row.table_name);

    console.log('List of tables:');
    for (const tableName of tableNames) {
      console.log(`\nTable: ${tableName}`);
      const tableData = await pool.query(`SELECT * FROM "${tableName}"`);
      console.log('Data:');
      console.table(tableData.rows);
    }
  } catch (err) {
    console.error('Error fetching tables:', err);
  }
};

// Call the function
// showAllTables();

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
                if (
                  !uniqueArns.includes(nodes.role_arn) &&
                  nodes.role_arn &&
                  nodes.role_arn.startsWith('arn')
                )
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

// get arns and users

const getUsersAndArns = async () => {
  try {
    const usersData = await pool.query(`SELECT _id, role_arn FROM "users"`);

    const usersAndArns = usersData.rows
      .filter((row) => row.role_arn && row.role_arn.startsWith('arn'))
      .map((row) => ({
        id: row._id,
        role_arn: row.role_arn,
      }));

    return usersAndArns;
  } catch (err) {
    console.error('Error fetching users and ARNs:', err);
    throw err;
  }
};

module.exports = { getArns, getUsersAndArns };

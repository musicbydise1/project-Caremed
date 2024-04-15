// dbConfig.js

const { Pool } = require('pg');

const connOptions = {
  user: 'postgres',
  host: 'localhost',
  database: 'caremed',
  password: 'root',
  port: 5432,
};

const pool = new Pool(connOptions);

const executeQuery = async (queryString, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(queryString, params);
    return result;
  } finally {
    client.release();
  }
};

const checkExistence = async (queryString, params) => {
  const result = await executeQuery(queryString, params);
  return result.rows.length > 0;
};

const insertUser = async (queryString, params) => {
  await executeQuery(queryString, params);
};

const getUser = async (queryString, params) => {
  const result = await executeQuery(queryString, params);
  return result.rows[0];
};

module.exports = { executeQuery, checkExistence, insertUser, getUser };

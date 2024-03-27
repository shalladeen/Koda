const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT || 5432,
});

const insertUser = async (name, email, hashedPassword) => {
  // TODO: Hash the password using a library like bcrypt before storing it
  const result = await pool.query(
    'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

module.exports = {
  insertUser,
};

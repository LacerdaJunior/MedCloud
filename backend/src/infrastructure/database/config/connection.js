const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST || "localhost",
  user: process.env.POSTGRES_USER || "admin",
  password: process.env.POSTGRES_PASSWORD || "adminpassword",
  database: process.env.POSTGRES_DB || "medcloud_db",
  port: process.env.POSTGRES_PORT || 5432,
});

module.exports = pool;

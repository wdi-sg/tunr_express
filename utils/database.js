const pg = require("pg");

// Initialise postgres client
const configs = {
  user: "springfield",
  host: "127.0.0.1",
  database: "tunr_db",
  port: 5432,
};

const pool = new pg.Pool(configs);

module.exports = pool;

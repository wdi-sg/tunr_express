const { Pool } = require('pg')
const pool = new Pool()
Object.freeze(pool)

module.exports = pool

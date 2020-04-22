const conn = require('./connection')

class Database {
  constructor (conn) {
    this.conn = conn
  }

  //* func must always returns res
  // @param {Arr} values [1,2,3,4,'dfd']
  async _execute (text, values, func) {
    let res
    const client = await this.conn.connect()
    try {
      res = values ? await client.query(text, values)
        : await client.query(text)
      return func ? func(res) : res
    } finally {
      client.release()
    }
  }
}

const createDB = ((conn) => {
  const db = new Database(conn)
  Object.freeze(db)
  return db
})(conn)

module.exports = createDB

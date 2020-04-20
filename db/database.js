require('dotenv').config()
const {insert} = require('./queries')

const Model = require('../models/model')

class Database {
  constructor (conn) {
    this.conn = conn
  }

  //* func must always returns res
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

  async save (obj) {
    if (!obj instanceof Model) {
      throw Error('Invalid model')
    }
    const tableName = obj.getResourceName()
    const { [obj.getPrimaryKey()]: _, ...data } = obj.data
    const columns = Object.keys(data)
    const values = Object.values(data)
    let text = insert(tableName,columns,values)
    return this._execute(text, values)
  }



}

module.exports = Database

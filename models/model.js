const db = require('../db/database')
const {
        prepareInsertStmt,
        prepareSelectStmt
      } = require('../db/queries')

class Model {

  constructor (id = -1) {
    // new object have id -1
    // having a _data to avoid
    // conflicts with db field name
    // e.g constructor.name

    this._data = {}
    this._data.id = id
  }

  get data () {
    return this._data
  }

  set data (data) {
    this._data = data
  }

  // returns this
  static async select (fieldsToSelect, whereParams) {
    let data,values
    const tableName = this.name.toLowerCase()
    const statement = prepareSelectStmt(tableName, fieldsToSelect, whereParams)
    if (whereParams) {
      values = Object.values(whereParams)
    }
    data = await db._execute(statement, values)
    return this.deSerialize(data.rows)
  }

  static deSerialize (data) {
    return data.map(item=> new this().data = item)
  }

  // @param fieldsToSelect ['id','name'] || "*"
  // @param whereParams {id:1, name:'dfd'}

  save () {
    const tableName = this.getResourceName()
    const { [this.getPrimaryKey()]: _, ...data } = this.data
    const columns = Object.keys(data)
    const values = Object.values(data)
    let statement = prepareInsertStmt(tableName, columns, values)
    return db._execute(statement, values)
  }

  getResourceName () {
    if (this.tableName) return this.tableName
    return this.constructor.name.toLowerCase()
  }

  getPrimaryKey () {
    for (let [key, value] of Object.entries(this.fields)) {
      if (value.primary) return key
    }
  }

}

module.exports = Model
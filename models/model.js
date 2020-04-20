const db = require('../db/database')
const {
        prepareInsertStmt,
        prepareSelectStmt,
        prepareUpdateStmt,
        prepareDeleteStmt
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

  get id () {
    return this.data.id
  }

  set id (id) {
    this._data.id = id
  }

  get data () {
    return this._data
  }

  set data (data) {
    this._data = data
  }

  // @param fieldsToSelect ['id','name'] || "*"
  // @param whereParams {id:0, name:'dfd'}

  // @returns this
  static async select (fieldsToSelect, whereParams) {
    let data, values
    const tableName = this.name.toLowerCase()
    const statement = prepareSelectStmt(tableName, fieldsToSelect, whereParams)
    if (whereParams) {
      values = Object.values(whereParams)
    }
    data = await db._execute(statement, values)
    return this.deSerialize(data.rows)
  }

  static deSerialize (data) {
    return data.map(item => new this().data = item)
  }

  // TODO: if any field is null or empty, remove
  // @returns inserted row id
  save () {
    const tableName = this.getResourceName()
    const { [this.getPrimaryKeyName()]: _, ...data } = this.data
    const columns = Object.keys(data)
    const values = Object.values(data)
    let statement = prepareInsertStmt(tableName, columns, values)
    return db._execute(statement, values)
  }

  // TODO: if any field is null or empty, remove
  update () {
    const tableName = this.getResourceName()
    const { [this.getPrimaryKeyName()]: primaryKey, ...data } = this.data
    const columns = Object.keys(data)
    const values = Object.values(data)
    let statement = prepareUpdateStmt(tableName, columns, values, { id: primaryKey })
    values.push(primaryKey)
    return db._execute(statement, values)
  }

  // @returns deleted item id
  delete () {
    const tableName = this.getResourceName()
    const pk = this.getPrimaryKeyName()
    const { [this.getPrimaryKeyName()]: primaryKey } = this.data
    let statement = prepareDeleteStmt(tableName, { [pk]: primaryKey })
    return db._execute(statement, [primaryKey])
  }

  getResourceName () {
    if (this.tableName) return this.tableName
    return this.constructor.name.toLowerCase()
  }

  getPrimaryKeyName () {
    for (let [key, value] of Object.entries(this.fields)) {
      if (value.primary) return key
    }
  }

}

module.exports = Model
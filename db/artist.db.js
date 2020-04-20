const Database = require('./database')
const Artist = require('../models/artist.model')
const {select} = require('./queries')
const conn = require('./connection')

class ArtistDB extends Database {

  constructor (pool) {
    super(pool);
  }

  async findByID(id) {

    const selections = "*";
    const where = {id}
    const res = this.findByColumns({id})
  }

  /*
  @param {id:1, name:'dfd'}
  @return this
  */
  async findByColumns (selections,where) {
    const tableName = Artist.constructor.name.toLowerCase()
    let text = select(tableName, selections, where )
  }
}

const createDB = ((conn) => new ArtistDB(conn))(conn)

module.exports = createDB
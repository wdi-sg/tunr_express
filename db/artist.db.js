const Database = require('./database')
const Artist = require('../models/artist.model')
const {select} = require('./queries')
const conn = require('./connection')

class ArtistDB extends Database {

  constructor (pool) {
    super(pool);
  }

  async findByID(id) {
    const res = this.findByColumn({id})
  }

  /*
  @param  {number} id
  @return {Artist}
  */
  async findByColumn ([{ column, val }]) {
    const tableName = Artist.constructor.name.toLowerCase()
    let text = select(tableName, '*',  )

  }
}

const createDB = ((conn) => new ArtistDB(conn))(conn)

module.exports = createDB
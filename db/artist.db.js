const Database = require('./database')
const conn = require('./connection')

class ArtistDB extends Database{
  constructor (pool) {super(pool);}

  /*
  @param  {number} id
  @return {Artist}
  */

  findById(id) {

  }
}


const createDB = ((conn) => new ArtistDB(conn))(conn)

module.exports = createDB
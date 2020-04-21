const Model = require('./model')

class Playlsit extends Model {

  constructor (id, name) {
    super(id)
    this._data.name = name
  }

  get name() {
    return this._data.name
  }

  set name(name) {
    this._data.name = name
  }

  get fields() {
    return {
      id: {
        type: 'int',
        primary: true
      },
      name: {
        type: 'text'
      }
    }
  }


}
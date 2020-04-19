const Model = require('./model')

class Artist extends Model {

  constructor (name, photo_url, nationality) {
    super()
    this._data.name = name;
    this._data.photo_url = photo_url;
    this._data.nationality = nationality
  }

  get name() {
    return this._data.name
  }

  set name(name) {
    this._data.name = name;
  }

  get photo_url () {
    return this._data.photo_url;
  }

  set photo_url(url) {
    this._data.photo_url = url
  }

  get nationality () {
    return this._data.nationality
  }

  set nationality (nationality) {
    this._data.nationality = nationality
  }


  get fields () {
    return {
      id: {
        type: 'int',
        primary: true
      },

      name: {
        type: 'text'
      },

      photo_url : {
        type: 'text'
      },

      nationality: {
        type: 'text'
      }
    }
  }

}

module.exports = Artist



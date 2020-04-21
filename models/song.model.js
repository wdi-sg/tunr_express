const Model = require('./model')

class Song extends Model {

  constructor (id, title, album, preview_link, artwork, artist_id) {
    super(id)
    this.data.title = title
    this.data.album = album
    this.data.preview_link = preview_link
    this.data.artwork = artwork
    this.data.artist_id = artist_id
  }

  get title () {
    return this._data.title
  }

  set title (title) {
    this._data.title = title
  }

  get album () {
    return this.data.album
  }

  set album (album) {
    this._data.album = album
  }

  get preview_link () {
    return this._data.preview_link
  }

  set preview_link (preview_link) {
    this._data.preview_link = preview_link
  }

  get artwork () {
    return this._data.artwork
  }

  set artwork (artwork) {
    this._data.artwork = artwork
  }

  get artist_id () {
    return this._data.artist_id
  }

  set artist_id (artist_id) {
    this._data.artist_id = artist_id
  }

  // initially intended for pars
  get fields () {
    return {
      id: {
        type   : 'int',
        primary: true,
      },

      title: {
        type: 'text'
      },

      album: {
        type: 'text'
      },

      preview_link: {
        type: 'text'
      },

      artwork: {
        type: 'text'
      },

      artist_id: {
        type: 'int'
      }
    }
  }

  // hasOne => artist, has Many =>artists
  get relations () {
    return {
      'artist': {
        type: ' hasOne',
        fk  : 'artist_id'
      }
    }
  }

}

module.exports = Song
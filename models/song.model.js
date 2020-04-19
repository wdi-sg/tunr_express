class Song extends Model {

  constructor (title, album, preview_link, artwork, artist_id) {
    super();
    this.data.title = title;
    this.data.album = album;
    this.data.preview_link = preview_link;
    this.data.artwork = artwork;
    this.data.artist_id = artist_id
  }



  fields () {
    return {
      id: {
        type: 'int',
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

      artwork : {
        type: 'text'
      },

      artist_id: {
        type: 'int'
      }
    }
  }

}

module.exports = Song
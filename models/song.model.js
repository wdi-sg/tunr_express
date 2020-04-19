class Song extends Model {

  constructor (title, album, preview_link, artwork, artist_id) {
    super();
    this.title = title
    this.album = album;
    this.preview_link = preview_link;
    this.artwork = artwork;
    this.artist_id = artist_id
  }



}
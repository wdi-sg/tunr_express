var React = require("react");
var Layout = require('../layout/layout');

class Home extends React.Component {
  render() {

    let artists = this.props.artists;
    let song = this.props.song;

    let artist_id = this.props.artist_id;

    let selectArtists = this.props.artists.map (artist => {

      if (parseInt(artist.id) === parseInt(artist_id)) {
        return <option key={artist.id} value={artist.id} selected>{artist.name}</option>
      } else {
        return <option key={artist.id} value={artist.id}>{artist.name}</option>
      }
    })

    let putString = `/artists/${artist_id}/songs/${song.id}?_method=PUT`;

    let deleteString = `/artists/${artist_id}/songs/${song.id}?_method=DELETE`;

    let title = "Edit " + song.title;

    return (
    <Layout title={title}>
      <h1>Edit {song.title}</h1>
        <form method="POST" action={putString}>
          <label>Title:</label>
          <input name="title" required autoComplete="off" defaultValue={song.title}/>
          <label>Album:</label>
          <input name="album" required autoComplete="off" defaultValue={song.album}/>
          <label>Preview Link:</label>
          <input name="preview_link" required autoComplete="off" defaultValue={song.preview_link}/>
          <label>Artwork URL:</label>
          <input name="artwork" required autoComplete="off" defaultValue={song.artwork}/>
          <label>Artist:</label>
          <select name="artist_id">
            {selectArtists}
          </select>
          <input type="submit" value="Edit"/><br/>
        </form>
        <form method="POST" action={deleteString}>
          <input type="submit" value="Delete"/><br/>
        </form>
      </Layout>
    )
  }
}

module.exports = Home;

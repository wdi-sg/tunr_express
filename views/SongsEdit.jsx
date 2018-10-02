const React = require('react');

class SongsEdit extends React.Component {
  render() {
    const url = `/songs/${this.props.song.id}?_method=PUT`;
    const artists = this.props.artists.map(artist => {
      if (artist.id === this.props.song.artist_id) {
        return <option key={artist.id} value={artist.id} selected>{artist.name}</option>;
      }

      return <option key={artist.id} value={artist.id}>{artist.name}</option>;
    });

    return (
      <html>
        <head />
        <body>
          <h1>Edit Song</h1>
          <form method="POST" action={url}>
            <p>Title</p>
            <input type="text" name="title" defaultValue={this.props.song.title} required />
            <p>Album</p>
            <input type="text" name="album" defaultValue={this.props.song.album} required />
            <p>Preview Link</p>
            <input type="url" name="preview_link" defaultValue={this.props.song.preview_link} required />
            <p>Artwork</p>
            <input type="url" name="artwork" defaultValue={this.props.song.artwork} required />
            <p>Artist</p>
            <select name="artist" id="artist">
              {artists}
            </select>
            <br /><br />
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = SongsEdit;

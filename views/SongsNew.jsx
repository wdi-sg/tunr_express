const React = require('react');

class SongsNew extends React.Component {
  render() {
    const artists = this.props.artists.map(artist => {
      return <option key={artist.id} value={artist.id}>{artist.name}</option>;
    });

    return (
      <html>
        <head />
        <body>
          <h1>Create A New Song</h1>
          <form method="POST" action="/songs">
            <p>Title</p>
            <input type="text" name="title" required />
            <p>Album</p>
            <input type="text" name="album" required />
            <p>Preview link</p>
            <input type="url" name="preview_link" required />
            <p>Artwork</p>
            <input type="url" name="artwork" required />
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

module.exports = SongsNew;

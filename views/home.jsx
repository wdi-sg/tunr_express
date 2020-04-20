var React = require("react");

class Home extends React.Component {
  render() {
    let allArtist = this.props.artists.map(artist => {
        let artistLink = "/artists/" + artist.id;
        return <li><a href={artistLink}>{artist.name}</a></li>
    });
    return (
      <html>
        <head />
        <body>
          <h1>Welcome! All artists: </h1>
          <ul>
            {allArtist}
          </ul>
          <div>
            <a href="/artists/new">Add a new Artist</a>
          </div>
          <div>
            <a href="/playlist">Visit your playlists!</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
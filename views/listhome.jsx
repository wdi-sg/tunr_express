var React = require("react");

class Listhome extends React.Component {
  render() {
    const playlists= this.props.playlists.map(playlist => {
        let link = '/playlists/' + playlist.id;
        return (
            <li><a href={link}>{playlist.name}</a></li>
        );
    })
    return (
      <html>
        <head />
        <body>
          <h1>Playlists</h1>
            <form method="GET" action='/playlists/new'>
              <input type="submit" value="Add Playlist"/>
            </form>
          <ul>
            {playlists}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Listhome;
var React = require("react");

class Home extends React.Component {
  render() {
    const playlist_list = this.props.playlists;
    const playlists = playlist_list.map(playlist => {
      const link = `/playlist/${playlist.id}`
      return <li><a href={link}>{playlist.name}</a></li>
    })
    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Tunr!</h1>
          <p>
            Available playlists:<br/>
            <ul>
              {playlists}
            </ul>
          </p>
            <form action="/playlist" method="POST">
              <input type="text" name="name"/>
              <input type="submit" value="Add New Playlist"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Home;

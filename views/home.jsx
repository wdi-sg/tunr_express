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
        <link rel="stylesheet" href="style.css"/>
        <body>
          <h1>Playlist Generator</h1>
          <p>
            Available playlists:<br/>
            <ul>
              {playlists}
            </ul>
          </p>
          <form action="/playlist" method="post">
            <input type="text" name="name"/>
            <input type="submit" value="Create New Playlist"/>
          </form>
          <p id="visits" data-visits={this.props.visits}>
            Number of visits: {this.props.visits}<br/>
          </p> 
        <script src="/script.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Home;

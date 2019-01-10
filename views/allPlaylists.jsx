var React = require("react");

class AllPlaylists extends React.Component {
  render() {

    let eachPlaylist = this.props.playlists.map(playlist => {
      return (<a href={"/playlist/" + playlist.id}><h5>{playlist.name}</h5></a>);
    })

    return (
      <html>
        <head />
        <body>
          <h1>All Playlists</h1>
          <h3>
            <a href="/playlist/new">Add New Playlist</a><br/>
          </h3>
          {eachPlaylist}
        </body>
      </html>
    );
  }
}

module.exports = AllPlaylists;

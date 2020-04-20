var React = require("react");
class Playlist extends React.Component {

  render() {
    //console.log(this.props.artists)
    const playlistNames = this.props.playlists.map((playlist)=>{
      return <li><a href = 'playlist/'>{playlist.title}</a></li>
  });
    return (
      <html>
        <head />
        <body>
    <h1>All playlists:</h1>
          <p>{playlistNames}</p>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;

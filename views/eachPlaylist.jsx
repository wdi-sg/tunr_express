var React = require("react");

class EachPlaylist extends React.Component {
  render() {
    var eachSong;
    var playlistName;
    let playlistId = this.props.id;
    
    if (this.props.results.length === 0) {
      eachSong = "No songs in this playlist yet!";
      playlistName = "";
    } else {
      playlistName = this.props.results[0].playlist_name;
      eachSong = this.props.results.map(song => {
        return (<li><a href={"/song/" + song.song_id}>{song.song_title}</a></li>);
      })
    }

    return (
      <html>
        <head />
        <body>
          <h3>
              {playlistName}
          </h3>
          <h5>
            <a href={"/playlist/" + playlistId + "/new"}>Add more songs!</a><br/>
            <ul>
                {eachSong}
            </ul>
          </h5>

        </body>
      </html>
    );
  }
}

module.exports = EachPlaylist;

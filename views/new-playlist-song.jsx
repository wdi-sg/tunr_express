var React = require("react");

class NewPlaylistSong extends React.Component {
  render() {
    //     let songArr = this.props.ingredientsJson;
    //     let songNameArrOption = songArr.map((element) => {
    //     return <option>{element.name}</option>;
    // });
    return (
      <html>
        <head />
        <body>
          <h3>Add song to playlist</h3>
          <form method='POST' action='/playlists'>
            <p>Playlist Name</p>
            <input type='text' name='playlist name' placeholder="playlist name"/>
            <p>Song</p>
            <input type='text' name='song name' placeholder="song"/>
            <input type='submit' value='Submit'/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylistSong;

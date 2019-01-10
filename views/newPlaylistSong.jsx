var React = require("react");

class NewPlaylistSong extends React.Component {
  render() {

    let id = this.props.id;
    let eachSong = this.props.songs.map(song => {
      return (<option value={song.song_id}>{song.song_title}</option>)
    })

    return (
      <html>
        <head/>
        <body>
          <h3>Add Songs</h3>

          <form action={"/playlist/" + id} method="POST">
            <select name="song">
              {eachSong}
            </select>

            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylistSong;

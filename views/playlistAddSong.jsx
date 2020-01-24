var React = require("react");

class playlistAddSong extends React.Component {
  render() {

    const songList = this.props.songData.map( song => {
        return <option value = {song.id}>{song.title}</option>
    });

    const playlistList = this.props.playlistData.map( artist => {
        return <option value = {playlist.id}>{playlist.title}</option>
    });

    return (
      <html>
        <head />
        <body>
            <h3>Add song to playlist!</h3>
            <form action="/playlist/:id/newsong" method="POST">
                <div>Select song</div>
                <select name = "artistId">
                    {playlistList}
                </select>
                <select name = "songId">
                    {songList}
                </select>
                <input type="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = playlistAddSong;
var React = require("react");

class NewPlaylist extends React.Component {
  render() {
        console.log("playlist-new-song.jsx");

        //
        // console.log(this.props.rows)
        let allSAData = this.props.allsongs.rows;
        let playlistData = this.props.playlist.rows[0];
        console.log("allSAData")
        console.log(allSAData)
        console.log("playlistData")
        console.log(playlistData)


        let playlistLink = "/playlists/"+playlistData.id;

        const playlistsOptionsElements = allSAData.map((song) => {
            return <p key={song.song_id}><input type="checkbox" name="song_id" value={song.song_id} /> {song.title} by {song.artist_name}</p>
        })

    return (
      <html>
        <head />
        <body>
          <h3>Add New Song to Playlist</h3>
          <form method="POST" action={playlistLink}>
            <p>Playlist: {playlistData.name}<input name="playlist_id" type="hidden" value={playlistData.id} readOnly/></p>
            <p><input type="submit" value="Add Song(s)"/></p>
            <p>Songs List</p>
            {playlistsOptionsElements}
          </form>
        </body>
      </html>
    );
  }
};

module.exports = NewPlaylist;

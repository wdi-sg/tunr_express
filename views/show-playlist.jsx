var React = require("react");

class ShowPlaylist extends React.Component {
  render() {
        // console.log('show-playlist.jsx')

        let playlist = this.props.playlist.rows[0];
        let playlistSong = this.props.playlistSong.rows;
        let cookiesVisits = parseInt(this.props.cookies.visits);
        if(isNaN(cookiesVisits)) {
            cookiesVisits = 1;
        };


        //link to Home Page
        let homeLink = "/"

        //link to Artist Page
        let allPlaylistsLink = "/playlists"

        //link to edit Artist
        const playlistAddSongLink = "/playlists/" + playlist.id + "/newsong";
        const playlistDeleteLink = "/playlists/" + playlist.id + "?_method=delete";

        const listSongs = playlistSong.map((song) => {
            return <li key={song.song_id}><a href={"/songs/"+song.song_id}>{song.title}</a></li>
        })

    return (
      <html>
      <head>
        <link rel="stylesheet" type="text/css" href="style.css" />
      </head>
        <body>
            <p><a href={homeLink}>Back to Main</a></p>
            <p><a href={allPlaylistsLink}>All Playlists</a></p>
            <h3>Playlist</h3>
            <div>
                <p>Name: {playlist.name}</p>
                <p>Songs in this playlist</p>
                <ol>{listSongs}</ol>
                <p><a href={playlistAddSongLink}>Add Song to {playlist.name}</a></p>
            </div>
            <br/>
            <form method="POST" action={playlistDeleteLink}>
                <input type="submit" value="delete Playlist"/>
            </form>
            <br />
            <div>
                <p>Visits: <span className="cookiesV">{cookiesVisits}</span></p>
                <p className="badge-title">User's Badge</p>
                <p className="badge"></p>
            </div>
            <script src="/script.js"></script>
        </body>
      </html>
    );
  }
};

module.exports = ShowPlaylist;
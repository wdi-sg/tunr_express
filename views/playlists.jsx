var React = require("react");

class Playlists extends React.Component {
  render() {
    // console.log('Playlists.jsx')

    let cookiesVisits = parseInt(this.props.cookies.visits);
    if(isNaN(cookiesVisits)) {
        cookiesVisits = 1;
    };

    let playlistData = this.props.playlists.rows;
    let playlistsNameList;

    let message="";
    if (playlistData.length === 0) {
        message = "You do not have a playlist yet. Please add new playlist.";
        playlistsNameList = [];
    } else {
        playlistsNameList = playlistData.map((playlist) => {
            return <li key={playlist.id}><a href={'/playlists/'+playlist.id}>{playlist.name}</a></li>
        });
    };



    return (
      <html>
        <head />
        <body>
            <a href="/">Back to Main</a>
            <br/>
            <h1>Playlists</h1>
            <p>{message}</p>
            <br/>
            <a href="/playlists/new">Add New Playlist</a>
            <br/>
            <ol>{playlistsNameList}</ol>
            <br/>
            <div>
                <p>Visits: {cookiesVisits}</p>
            </div>
        </body>
      </html>
    );
  }
}
module.exports = Playlists;
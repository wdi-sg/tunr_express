var React = require("react");
var DefaultLayout = require('./layouts/default');

class Playlist extends React.Component {
  render() {

    const songs = this.props[0].map( (song) => {
            return (
                <div style={{marginTop: '50px'}}>
                    <h1>{song.title}</h1>
                    <form method="POST" action={`/playlists?_method=DELETE`}>
                        <input type="hidden" name='playlist_id' value={song.playlist_id}/>
                        <input type="hidden" name='song_id' value={song.song_id}/>
                        <input type="hidden" name='playlist' value={song.name}/>
                        <input type="submit" class="btn btn-danger" value="Delete Song"/>
                    </form>
                </div>
            );
    });

    return (
        <DefaultLayout>
            {songs}
        </DefaultLayout>
    );
  }
}

module.exports = Playlist;

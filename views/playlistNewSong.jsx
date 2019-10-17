var React = require('react');

class SongForPlaylist extends React.Component {
    render() {

        let showSongs= this.props.data.songsList.map((song) => {
            return (
                <div>
                       <h3> {song.id}. {song.title}</h3>
                 </div>
            );
        });

        return (
            <html>
                <head />
                <body>
                    <h3>Choose a song from the library:</h3>
                   {showSongs}
                    <form method="POST" action={'/playlists/' + this.props.id}>
                       <input type="text" name="id" />
                        <input type="submit" value="Submit" />
                    </form>
                </body>
            </html>
        );
    }
};

module.exports = SongForPlaylist;
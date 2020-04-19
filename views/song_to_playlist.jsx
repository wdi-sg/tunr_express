const React = require('react');
class Song_To_Playlist extends React.Component {
    render () {

        const playlistId = this.props.playlistId;
        const playlistName = this.props.playlistName;
        const allSongs = this.props.songs;
        const playlistPage = '/playlists/' + playlistId;

        const allSongsList = allSongs.map(song => {
            return (<div>
                        <input className="form-check-input" name='song_id' type="checkbox" value={song.id} id={song.id}/>
                        <label className="form-check-label" for={song.id}>{song.title}</label>
                    </div>
            )
        })

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h1 className='text-center'>{playlistName}</h1>
                    </div>
                    <div className='row justify-content-center'>
                        <form method='POST' action={playlistPage}>
                            <div className="form-check">
                                {allSongsList}
                            </div>
                            <br/>
                            <input type="submit" className='btn btn-primary' value="Submit"/>
                        </form>
                    </div>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Song_To_Playlist;
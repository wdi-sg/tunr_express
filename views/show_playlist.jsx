const React = require('react');
class Show_Playlist extends React.Component {
    render () {

        const playlistId = this.props.playlistId;
        const playlistName = this.props.playlistName;
        const updatedSongs = this.props.updatedSongs;

        const updatedSongsList = updatedSongs.map(updatedSong => {
            return (<li>{updatedSong.title}</li>)
        })

        const addRemoveSongsToPlaylist = '/playlists/' + playlistId + '/newsong';
        const deletePlaylist = '/playlists/' + playlistId + '?_method=delete';
        const playlistPage = '/playlists/' + playlistId;

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
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-primary'><a href={addRemoveSongsToPlaylist} className='text-white'>Add/ Remove Songs</a></button>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <h2 className='text-center'>Songs</h2>
                    </div>
                    <div className='row justify-content-center'>
                        <ol>
                            {updatedSongsList}
                        </ol>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-3 d-flex justify-content-end'>
                            <button className='btn btn-secondary'><a href='/playlists/' className='text-white text-decoration-none'>Back to Playlist List</a></button>
                        </div>
                        <div className='col-2 d-flex justify-content-center'>
                            <form method='POST' action={deletePlaylist}>
                                <input className='btn btn-danger' type='submit' value='Delete Playlist'/>
                            </form>
                        </div>
                        <div className='col-3'>
                            <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Show_Playlist;
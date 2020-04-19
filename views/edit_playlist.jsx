const React = require('react');
class Edit_Playlist extends React.Component {
    render () {

        const playlistId = this.props.playlistId;
        const playlistName = this.props.playlistName;
        const addedSongs = this.props.addedSongs;

        const addedSongsList = addedSongs.map(addedSong => {
            return (<li>{addedSong.title}</li>)
        })

        const addSongToPlaylist = '/playlists/' + playlistId + '/newsong';
        const editPlaylist = '/playlists/' + playlistId + '/edit';

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <h1 className='text-center'>Edit {playlistName}</h1>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-info'><a href={addSongToPlaylist} className='text-white'>Add/ Remove Songs</a></button>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <h2 className='text-center'>Songs</h2>
                    </div>
                    <div className='row justify-content-center'>
                        <ol>
                            {addedSongsList}
                        </ol>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-3 d-flex justify-content-end'>
                            <button className='btn btn-dark'><a href='/playlists/' className='text-white text-decoration-none'>Back to Playlist List</a></button>
                        </div>
                        <div className='col-3'>
                            <button className='btn btn-secondary'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Edit_Playlist;
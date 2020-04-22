const React = require('react');
class Show_Playlist extends React.Component {
    render () {

        const playlistId = this.props.playlistId;
        const playlistName = this.props.playlistName;
        const updatedSongs = this.props.updatedSongs;
        const visitCounter = this.props.visitCounter;

        //Render page visit badges
        const visitCounterImageList = {
            "ten": "https://image.flaticon.com/icons/svg/744/744929.svg",
            "fifty": "https://image.flaticon.com/icons/svg/744/744922.svg",
            "hundred": "https://image.flaticon.com/icons/svg/744/744918.svg"
        }

        let visitCounterImage;;
        let visitCounterMessage = '';
        if (visitCounter >= 10 && visitCounter < 50) {
            visitCounterImage = visitCounterImageList.ten;
            visitCounterMessage = 'Newbie badge unlocked';
        } else if (visitCounter >= 50 && visitCounter < 100) {
            visitCounterImage = visitCounterImageList.fifty;
            visitCounterMessage = 'Novice badge unlocked';
        } else if (visitCounter >= 100) {
            visitCounterImage = visitCounterImageList.hundred;
            visitCounterMessage = 'Veteran badge unlocked';
        }

        const updatedSongsList = updatedSongs.map(updatedSong => {
            return (<div className='row justify-content-center'>
                        <div className='col-3'>
                            <div className='row' style={{borderTop: "1px solid grey", padding: "10px 0 0 15px"}}>
                                <h5>{updatedSong.title}</h5>
                            </div>
                            <div className='row' style={{paddingLeft: "15px"}}>
                                <p>{updatedSong.album}</p>
                            </div>
                        </div>
                        <div className='col-4 d-flex justify-content-end' style={{borderTop: "1px solid grey", paddingTop: "12px"}}>
                            <audio controls>
                                <source src={updatedSong.preview_link} type="audio/mp4"/>
                            </audio>
                        </div>
                    </div>)
        })

        const addRemoveSongsToPlaylist = '/playlists/' + playlistId + '/newsong';
        const deletePlaylist = '/playlists/' + playlistId + '?_method=delete';
        const editPlaylist = '/playlists/' + playlistId + '/edit';
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
                        <div className='col-3 d-flex justify-content-end'>
                            <button className='btn btn-primary'><a href={addRemoveSongsToPlaylist} className='text-white'>Add/ Remove Songs</a></button>
                        </div>
                        <div className='col-3'>
                            <button className='btn btn-warning'><a href={editPlaylist} className='text-dark'>Edit Playlist</a></button>
                        </div>
                    </div>
                    <br/>
                        {updatedSongsList}
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
                <br/>
                <br/><br/><br/>
                <div className='row justify-content-center'>
                    <p style={{color: "grey", borderTop: "1px solid gainsboro", borderBottom:"1px solid gainsboro", padding: "5px 20px"}}>Page Visits: {visitCounter}</p>
                </div>
                <div className='row justify-content-center'>
                    <img src={visitCounterImage} style={{width: "50px", padding: "0 0 8px 0"}}/>
                </div>
                <div className='row justify-content-center'>
                    <p style={{color: "grey"}}>{visitCounterMessage}</p>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = Show_Playlist;
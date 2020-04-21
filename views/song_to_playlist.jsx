const React = require('react');

class Song_To_Playlist extends React.Component {
    render () {

        const playlistId = this.props.playlistId;
        const playlistName = this.props.playlistName;
        const allSongs = this.props.allSongs;
        const existingSongs = this.props.existingSongs;
        const playlistPage = '/playlists/' + playlistId;
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

        const allSongsList = allSongs.map(song => {
            let songExists = false;

            existingSongs.forEach(existingSong => {
                if (song.id === existingSong.id) {
                    songExists = true;
                }
            })
            return (
                <div className='col-3' style={{borderLeft: "1px solid gainsboro"}}>

                {songExists === true ?
                    <input className="form-check-input" name='song_id' type="checkbox" value={song.id} id={song.id} checked/>
                :
                    <input className="form-check-input" name='song_id' type="checkbox" value={song.id} id={song.id} />
                }

                    <label className="form-check-label" for={song.id}><strong>{song.title}</strong></label>
                    <p><i>{song.album}</i></p>
                    <p>{song.artist_name}</p>
                    <div>
                        <a href={song.preview_link} className='btn btn-info' style={{width: '70px', height: '27px', padding: 0}}>Preview</a>
                    </div>
                    <br/><br/>
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
                    <br/>
                    <div className='row justify-content-center'>
                        <h4 className='text-center'>Select songs to add to this playlist</h4>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <form method='POST' action={playlistPage}>
                            <div className="form-check">
                                <div className='row justify-content-center'>
                                    {allSongsList}
                                </div>
                            </div>
                            <br/>
                            <div className='row justify-content-center'>
                                <div className='col-2 d-flex justify-content-end'>
                                    <button className='btn btn-secondary'><a href={playlistPage} className='text-white'>Back to Playlist</a></button>
                                </div>
                                <div className='col-2'>
                                    <input type="submit" className='btn btn-primary' value="Submit"/>
                                </div>
                            </div>
                        </form>
                        <br/>
                    </div>
                </div>
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

module.exports = Song_To_Playlist;
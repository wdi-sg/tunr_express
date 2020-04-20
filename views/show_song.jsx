const React = require('react');
class Show_Song extends React.Component {
    render () {

        const song_id = this.props.song.id;
        const title = this.props.song.title;
        const album = this.props.song.album;
        const preview_link = this.props.song.preview_link;
        const artwork = this.props.song.artwork;
        const artist_id = this.props.song.artist_id;
        const artistName = this.props.song.name;
        const visitCounter = this.props.visitCounter;

        const editSongPage = '/artists/' + artist_id + '/songs/' + song_id + '/edit';
        const deleteSongPage = '/artists/' + artist_id + '/songs/' + song_id + '?_method=delete';
        const backToArtistSongList = '/artists/' + artist_id + '/songs/';

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

        return (
             <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className="card" style={{width: "21rem"}}>
                            <img className="card-img-top" src={artwork} alt={title} style={{height: "18rem"}}/>
                            <div className="card-body">
                                <h4 className="card-title text-center">{title}</h4>
                                <p className="card-text text-center">{artistName}</p>
                                <div className='row justify-content-center'>
                                    <button className='btn btn-info'><a href={preview_link} className='text-white text-decoration-none'>Preview</a></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-2 d-flex justify-content-end'>
                            <button className='btn btn-primary'><a href={editSongPage} className='text-white text-decoration-none'>Edit Details</a></button>
                        </div>
                        <div className='col-2'>
                            <form method='POST' action={deleteSongPage}>
                                <input className='btn btn-danger' type='submit' value='Delete Song'/>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-3 d-flex justify-content-end'>
                            <button className='btn btn-secondary'><a href={backToArtistSongList} className='text-white text-decoration-none'>Back to Artist Songs</a></button>
                        </div>
                        <div className='col-3'>
                            <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                    <br/>
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

module.exports = Show_Song;
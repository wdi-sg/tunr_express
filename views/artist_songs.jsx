const React = require('react');
class Artist_Songs extends React.Component {
    render () {

        let artistName = this.props.artist[0].name;
        const songsList = this.props.songs;
        const addSongPage = '/artists/' + this.props.id + '/songs/new'
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

        const displaySongs = songsList.map(song => {
            let songDetailsId = '/artists/' + this.props.id + '/songs/' + song.id;
            return (
                <div className="card" style={{width: "13rem"}}>
                    <img className="card-img-top" src={song.artwork} alt={song.title} style={{height: "10rem"}}/>
                    <div className="card-body justify-content-center">
                        <h4 className="card-title text-center">{song.title}</h4>
                        <p className="card-text text-center">{song.album}</p>
                        <div className='row justify-content-center'>
                            <div className='col-6'>
                                <button className='btn btn-info'><a href={song.preview_link} className='text-white text-decoration-none'>Preview</a></button>
                            </div>
                            <div className='col-6 d-flex justify-content-center'>
                                <button className='btn btn-primary'><a href={songDetailsId} className='text-white text-decoration-none'>Details</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <h2 className='text-center'>Songs by {artistName}</h2>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-2 d-flex justify-content-end'>
                            <button className='btn btn-secondary'><a href='/artists/list' className='text-white text-decoration-none'>Back to Artists List</a></button>
                        </div>
                        <div className='col-2 d-flex justify-content-center'>
                            <button className='btn btn-warning'><a href={addSongPage} className='text-dark text-decoration-none'>Add Song</a></button>
                        </div>
                        <div className='col-2 d-flex justify-content-start'>
                            <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        {displaySongs}
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

module.exports = Artist_Songs;
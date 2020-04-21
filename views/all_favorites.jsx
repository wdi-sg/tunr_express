const React = require('react');
class All_Favorites extends React.Component {
    render () {

        const userId = this.props.userId;
        const visitCounter = this.props.visitCounter;
        const favoritedSongs = this.props.favoritedSongs;

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

        let favoritedSongList = favoritedSongs.map(favoritedSong => {
            return (<div className="card" style={{width: "15rem"}}>
                        <img className="card-img-top" src={favoritedSong.artwork} alt={favoritedSong.title}/>
                        <div className="card-body justify-content-center">
                            <h5 className="card-title text-center">{favoritedSong.title}</h5>
                            <p className="card-text text-center"><em>{favoritedSong.album}</em></p>
                            <p className="card-text text-center"><strong>{favoritedSong.artist_name}</strong></p>
                            <div className='row justify-content-center' style={{borderTop: "1px solid gainsboro", padding: "10px 0 0 0"}}>
                                <audio controls>
                                    <source src={favoritedSong.preview_link} type="audio/mp4"/>
                                </audio>
                            </div>
                        </div>
                    </div>)
        })

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <h2 className='text-center'>Favorites</h2>
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-primary'><a className='text-white text-decoration-none' href='/favorites/new'>Add Song to Favorites</a></button>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        {favoritedSongList}
                    </div>
                    <br/><br/><br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <p style={{color: "grey", borderTop: "1px solid gainsboro", borderBottom:"1px solid gainsboro", padding: "5px 20px"}}>Page Visits: {visitCounter}</p>
                    </div>
                    <div className='row justify-content-center'>
                        <img src={visitCounterImage} style={{width: "50px", padding: "0 0 8px 0"}}/>
                    </div>
                    <div className='row justify-content-center'>
                        <p style={{color: "grey"}}>{visitCounterMessage}</p>
                    </div>
                </div>
            </body>
            </html>
        )
    }
}

module.exports = All_Favorites;
const React = require('react');

class New_Favorites extends React.Component {
    render () {

        const allSongs = this.props.allSongs;
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
            return(<option value={song.id}>{song.title}</option>)
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
                        <h2 className='text-center'>Add Favorites</h2>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <h5 className='text-center'>Select a song to add to Favorites.</h5>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <form method='POST' action='/favorites'>
                            <div className="form-check">
                                <div className='row justify-content-center'>
                                    <select style={{width: "200px", height: "30px"}} name='favoritedSongId'>
                                        {allSongsList}
                                    </select>
                                </div>
                            </div>
                            <br/><br/>
                            <div className='row justify-content-center'>
                                <input type="submit" className='btn btn-primary' value="Submit"/>
                            </div>
                            <br/>
                            <div className='row justify-content-center'>
                                <button className='btn btn-secondary'><a href='/favorites/' className='text-white'>Back to Favorites</a></button>
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

module.exports = New_Favorites;
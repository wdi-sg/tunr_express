const React = require('react');
class All_Artists extends React.Component {
    render () {

        const artists = this.props.list;
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

        const displayArtist = artists.map(artist => {
            let idPage = '/artists/' + artist.id;
            let songPage= '/artists/' + artist.id + '/songs'
            return (
                <div className="card" style={{width: "15rem"}}>
                    <img className="card-img-top" src={artist.photo_url} alt={artist.name} style={{height: "12rem"}}/>
                    <div className="card-body">
                        <h4 className="card-title text-center">{artist.name}</h4>
                        <p className="card-text text-center">{artist.nationality}</p>
                        <br/>
                        <div className='row justify-content-center'>
                            <div className='col-5'>
                                <button className='btn btn-primary'><a href={idPage} className='text-white text-decoration-none'>Profile</a></button>
                            </div>
                            <div className='col-5'>
                                <button className='btn btn-info'><a href={songPage} className='text-white text-decoration-none'>Songs</a></button>
                            </div>
                        </div>
                    </div>
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
                    <h1 className='text-center'>List of Artists</h1>
                    <br/>
                    <div className='row justify-content-center'>
                        <div className='col-2 d-flex justify-content-end'>
                            <button className='btn btn-warning'><a href='/artists/songs/' className='text-dark text-decoration-none'>List of Songs</a></button>
                        </div>
                        <div className='col-2'>
                            <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
                        </div>
                    </div>
                    <br/>
                    <div className='row justify-content-center '>
                        {displayArtist}
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

module.exports = All_Artists;
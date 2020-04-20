var React = require("react");

class Home extends React.Component {
  render() {

    const visitCounter = this.props.visitCounter;
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
                <h1 className='text-center'>Tunr</h1>
                <h5 className='text-center'>The world's #1 music catalog/ player</h5>
                <br/>
                <div className='row justify-content-center'>
                    <div className='col 6 d-flex justify-content-end'>
                        <button className='btn btn-primary'><a href='/artists/new' className='text-white text-decoration-none'>New Artist</a></button>
                    </div>
                    <div className='col 6 d-flex justify-content-start'>
                        <button className='btn btn-primary'><a href='/artists/list' className='text-white text-decoration-none'>List of Artists</a></button>
                    </div>
                </div>
                <br/>
                <div className='row justify-content-center'>
                    <div className='col 6 d-flex justify-content-end'>
                        <button className='btn btn-warning'><a href='/artists/songs/new' className='text-dark text-decoration-none'>New Song</a></button>
                    </div>
                    <div className='col 6 d-flex justify-content-start'>
                        <button className='btn btn-warning'><a href='/artists/songs/' className='text-dark text-decoration-none'>List of Songs</a></button>
                    </div>
                </div>
                <br/>
                <div className='row justify-content-center'>
                    <div className='col-6 d-flex justify-content-end'>
                        <button className='btn btn-success'><a href='/playlists/new' className='text-white text-decoration-none'>New Playlist</a></button>
                    </div>
                    <div className='col-6 d-flex justify-content-start'>
                        <button className='btn btn-success'><a href='/playlists/' className='text-white text-decoration-none'>List of Playlists</a></button>
                    </div>
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
    );
  }
}

module.exports = Home;
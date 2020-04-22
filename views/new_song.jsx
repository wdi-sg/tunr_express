const React = require("react");

class New_Song extends React.Component {
  render() {

    const allArtists = this.props.allArtists;
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

    const allArtistsList = allArtists.map(artist => {
        return (<option>{artist.name}</option>)
    })

    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
            <br/>
            <div className='container'>
                <h1 className='text-center'>New Song</h1>
                <br/>
                <form method='POST' action='/playlist'>
                    <div className='row justify-content-center'>
                        <p>Title <input type='text' name='title' placeholder='Enter title'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Album <input type='text' name='album' placeholder='Enter album'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Preview Link <input type='text' name='preview_link' placeholder='Enter preview URL'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Artwork <input type='text' name='artwork' placeholder='Enter artwork URL'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Choose an Artist <select className='border border-secondary' style={{width: "10rem", height: "2rem"}} name='artist'>
                            <option></option>
                            {allArtistsList}
                        </select></p>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <input type='submit' className='btn btn-primary' value='Submit'/>
                    </div>
                </form>
                <br/>
                <div className='row justify-content-center'>
                    <button className='btn btn-dark'><a href='/artists/' className='text-white text-decoration-none'>Back to Main Page</a></button>
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

module.exports = New_Song;
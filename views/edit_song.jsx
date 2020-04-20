const React = require("react");

class Edit_Song extends React.Component {
  render() {

    const song_id = this.props.song.id;
    const title = this.props.song.title;
    const album = this.props.song.album;
    const preview_link = this.props.song.preview_link;
    const artwork = this.props.song.artwork;
    const artist_id = this.props.song.artist_id;
    const artistName = this.props.song.name;
    const visitCounter = this.props.visitCounter;

    let songPage = '/artists/' + artist_id + '/songs/' + song_id;
    let editSongPage = '/artists/' + artist_id + '/songs/' + song_id + '?_method=put';

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

    const allArtistsList = this.props.artists.map(artist => {
        if (artist.name !== artistName) {
            return (<option>{artist.name}</option>);
        }
    })

    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        </head>
        <body>
            <br/>
            <div className='container'>
                <h1 className='text-center'>Edit Song</h1>
                <br/>
                <form method='POST' action={editSongPage}>
                    <div className='row justify-content-center'>
                        <p>Title <input type='text' name='title' value={title} placeholder='Enter title'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Album <input type='text' name='album' value={album} placeholder='Enter album'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Preview Link <input type='text' name='preview_link' value={preview_link} placeholder='Enter preview URL'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Artwork <input type='text' name='artwork' value={artwork} placeholder='Enter artwork URL'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p>Choose an Artist <select className='border border-secondary' style={{width: "10rem", height: "2rem"}} name='artist'>
                            <option>{artistName}</option>
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
                    <button className='btn btn-secondary'><a href={songPage} className='text-white text-decoration-none'>Back to Song Page</a></button>
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

module.exports = Edit_Song;
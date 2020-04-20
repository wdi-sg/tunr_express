const React = require("react");

class Edit_Playlist extends React.Component {
  render() {

    const playlistId = this.props.playlistId;
    const playlistName = this.props.playlistName;
    const visitCounter = this.props.visitCounter;

    const updatePlaylistName = '/playlists/' + playlistId + '?_method=put';
    const playlistPage = '/playlists/' + playlistId;

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
                <h1 className='text-center'>Edit Playlist</h1>
                <br/>
                <form method='POST' action={updatePlaylistName}>
                    <div className='row justify-content-center'>
                        <p>Name <input type='text' name='name' value={playlistName} placeholder='Enter name'/>
                        </p>
                    </div>
                    <div className='row justify-content-center'>
                        <p className='text-center text-secondary'>You can add or remove songs from the playlist page.</p>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <input type='submit' className='btn btn-primary' value='Submit'/>
                    </div>
                </form>
                <br/>
                <div className='row justify-content-center'>
                    <button className='btn btn-secondary'><a href={playlistPage} className='text-white text-decoration-none'>Back to Playlist</a></button>
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

module.exports = Edit_Playlist;
const React = require('react');
class Song_To_Playlist_Direct extends React.Component {
    render () {

        const playlists = this.props.playlists;
        const visitCounter = this.props.visitCounter;
        const songId = this.props.songId;


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

        const allPlaylists = playlists.map(playlist => {
            return (<option>{playlist.name}</option>)
        })

        return (
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
            </head>
            <body>
                <br/>
                <div className='container'>
                    <h2 className='text-center'>Add to Playlist</h2>
                    <h5 className='text-center'>Select a playlist to add the song to.</h5>
                    <br/>
                    <div className='row justify-content-center'>
                        <form method='POST' action='/playlists/:id'>
                            <select>
                                <option></option>
                                {allPlaylists}
                            </select>
                            <br/><br/>
                            <div className='row justify-content-center'>
                                <input type='submit' className='btn btn-primary' value='Submit'/>
                            </div>
                        </form>
                    </div>
                    <br/>
                    <div className='row justify-content-center'>
                        <button className='btn btn-secondary'><a href='/artists/songs' className='text-white text-decoration-none'>Back to Song List</a></button>
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

module.exports = Song_To_Playlist_Direct;
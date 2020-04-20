const React = require("react");

class Edit_Playlist extends React.Component {
  render() {

    const playlistId = this.props.playlistId;
    const playlistName = this.props.playlistName;

    const updatePlaylistName = '/playlists/' + playlistId + '?_method=put';
    const playlistPage = '/playlists/' + playlistId;

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
        </body>
      </html>
    );
  }
}

module.exports = Edit_Playlist;
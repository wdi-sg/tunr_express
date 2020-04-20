var React = require("react");

class EditSongs extends React.Component {
    render() {
        var currentSong = this.props.song[0];
        var currentArtist= this.props.artist;

        // console.log(currentSong);        
        // console.log(currentArtist);


        return (
            <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
                </head>
                <body className="bg-secondary">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/artists">Tunr Express</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link active" href="/artists">Artists <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="/playlists">Playlists</a>
              </div>
            </div>
          </nav>
                    <div className="container-fluid">
                        <h1 className="text-center w-75 ml-auto mr-auto bg-dark text-light"><em><u>Edit Song</u></em></h1>
                        <div className="container w-75 ml-auto mr-auto card bg-light pl-5 pr-5 pt-5 pb-5 border-0">
                            <form className="card bg-light pl-5 pr-5 pt-5 pb-5 border-0" method="POST" action={`/artists/${currentArtist}/songs/${currentSong.id}?_method=put`}>
                                Title:&emsp;
                        <input type="text" name="title" defaultValue={currentSong.title}/>
                                <br /><br />

                        Album:&emsp;
                        <input type="text" name="album" defaultValue={currentSong.album} />
                                <br /><br />

                        Preview_Link:&emsp;
                        <input type="text" name="preview_link" defaultValue={currentSong.preview_link} />
                                <br /><br />
                        Artwork&emsp;
                        <input type="text" name="artwork" defaultValue={currentSong.artwork} />
                                <br /><br />
                        
                                <button className="btn btn-success w-50 ml-auto mr-auto" type="submit"> Submit </button>

                            </form>
                            <form className="card bg-light pl-5 pr-5 pt-2  border-0" method="POST" action={`/artists/${currentArtist}/songs/${currentSong.id}?_method=delete`}>
                                <button className="btn btn-danger w-50 mr-auto ml-auto" type="submit"> Delete </button>
                            </form>


                        </div>
                    </div>


                </body>
            </html>
        );
    }
}

module.exports = EditSongs;

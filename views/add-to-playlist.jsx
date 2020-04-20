var React = require("react");

class AddToPlaylist extends React.Component {
    render() {
        console.log(this.props);
        const square = {
            width: '250px',
            height: '250px',
            backgroundImage: 'url(https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            objectFit: 'cover'
        };
        var songInfo = this.props.song;
        var songId = songInfo[0].song_id;

        songInfo = songInfo.map((element) => {
            return <div key={element.title} className="card text-center bg-light border-0 ml-0 mr-0">
                <img style={square} className="card-img-top mx-auto"
                    src={`${element.artwork}`} alt="Card image cap" />
                <div className="card-body">
                    <h2 className="card-title text-dark">Title: {element.title}</h2>
                    <h3 className="card-title text-dark">Artist: {element.name}</h3>
                    <h3 className="card-title text-dark">Album: {element.album}</h3>
                    <br />
                </div>
            </div>
        })
        var playlists = this.props.playlists;
        playlists = playlists.map((element) => {
            return   <option value={`${element.playlistid}`}>{element.name}</option>
        })
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
                                <a className="nav-item nav-link " href="/artists">Artists </a>
                                <a className="nav-item nav-link active" href="/playlists">Playlists<span className="sr-only">(current)</span></a>
                            </div>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <h1 className="text-center w-75 ml-auto mr-auto bg-dark text-light"><em><u>Add To Playlist</u></em></h1>
                        <div className="container w-75 ml-auto mr-auto pl-0 pr-0">
                            <br />
                            {songInfo}
                            <form className="card bg-light pl-5 pr-5 pt-5 pb-5" method="POST" action={`/playlists/${songId}`}>
                                Add to Playlist:&emsp;
                                <select id="playlist" name="playlist">
                                {playlists}
                                </select>
                                <br /><br />
                                <button className="btn btn-success w-50 ml-auto mr-auto" type="submit"> Submit </button>
                                <br />

                            </form>



                        </div>
                    </div>


                </body>
            </html>
        );
    }
}

module.exports = AddToPlaylist;

var React = require("react");

class SinglePlaylist extends React.Component {
  render() {
    console.log(this.props);
    const square = {
      width: '250px',
      height: '200px',
      backgroundImage: 'url(https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      objectFit: 'cover'
    };
    const square2 = {
      width: '50px',
      height: '50px',
      backgroundImage: 'url(https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      objectFit: 'cover'
    };
    var playlist = this.props.playlist[0];
    playlist = <div key={playlist.playlist_name} className="card text-center bg-light ml-0 mr-0">
        <img style={square} className="card-img-top mx-auto"
          src="https://image.shutterstock.com/image-vector/music-playlist-vector-icon-filled-260nw-1405119938.jpg" alt="Card image cap" />
        <div className="card-body">
          <h2 className="card-title text-dark">{playlist.playlist_name}</h2>
          <a href={`/playlists/${playlist.playlist_id}/edit`} className="btn btn-secondary">Edit Name</a>
          <br />
        </div>
      </div>;
    

    var songs = this.props.playlist;
    songs = songs.map((element) => {
      return <li key={element.title} className="list-group-item list-group-item-action"><a href={`${element.preview_link}`} target="_blank">
        <img style={square2} src={`${element.artwork}`} className="float-left mr-3" />
        <h6 className = " text-dark"><strong> {element.trackid}. {element.title}</strong></h6>
        <h7 className = " text-dark"><strong>Artist:</strong> {element.artist_name} | <strong>Album: </strong>{element.album}</h7>
        </a>
        <a href="" className="btn btn-danger text-light  float-right mr-3">Remove from Playlist</a>
        <br />
      </li>
      
    })
    if (songs.length == 0) {
      songs = [
        <li key="No songs" className="list-group-item list-group-item-action">
          <h6 className="text-center"> No songs in database</h6>
          <br />
        </li>

      ]
    }

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
                <a className="nav-item nav-link active" href="/playlists">Playlists<span class="sr-only">(current)</span></a>
                <a className="nav-item nav-link ml-5 text-light btn btn-danger" href="/logout">Logout </a>
              </div>
            </div>
          </nav>
          <div className="container-fluid">
            <h1 className="text-center w-75 ml-auto mr-auto bg-dark text-light"><em><u>Playlists</u></em></h1>
            <div className="container w-75 ml-auto mr-auto pl-0 pr-0">
              {playlist}
            </div>
            <ul className="list-group w-75 ml-auto mr-auto">
              <h4 className="text-center w-100 ml-auto mr-auto mb-0 bg-dark text-light pt-2 pb-2"><em>Songs</em></h4>
              {/* <a key="add-new" href="songs/new"><li className="list-group-item list-group-item-action">
                <img style={square2} src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRybEoxX-zFDrhiWh8S9UB-ij1uf8jNp87KlIG-g04MYjtKvKMU&usqp=CAU" className="float-left mr-3" />
                <h6 className="pt-3 align-text-bottom">Add New Song</h6>
                
                <br />
              </li>
              </a> */}
              {songs}
            </ul>
          </div>
          <footer className="footer">
            <div className="container-fluid bg-dark  text-center h4 mb-0 mt-5 pt-2 pb-2 position-sticky sticky-bottom">
              <span className="text-light">Visited {this.props.visits} times</span>
            </div>
          </footer>
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossOrigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossOrigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = SinglePlaylist;

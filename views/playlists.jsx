var React = require("react");
class Playlists extends React.Component {
  render() {
    const square = {
      // width: '248px',
      height: '250px',
      backgroundImage: 'url(https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      objectFit: 'cover'
    };
    const square2 = {
      width: '250px',
      height: '250px',
      backgroundImage: 'url(https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      objectFit: 'cover'
    };

    var playlists = this.props.playlists;
    if (playlists.length == 0) {
      playlists = [];
    }
    else {
      playlists = playlists.map((element) => {
        return <a key={element.name} className="text-dark" href={`/playlists/${element.id}`}><div className="card text-center bg-light">
          <img style={square} className="card-img-top" src="https://image.shutterstock.com/image-vector/music-playlist-vector-icon-filled-260nw-1405119938.jpg" alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{element.name}</h5>
          </div>
        </div>
        </a>

      })
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
                <a className="nav-item nav-link active" href="/playlists">Playlists <span className="sr-only">(current)</span></a>
              </div>
            </div>
          </nav>
          
          <div className="container-fluid">
            <h1 className="text-center w-75 ml-auto mr-auto bg-dark text-light"><em><u>Playlists</u></em></h1>
            <div className="row row-cols-3 w-75 ml-auto mr-auto">
              {playlists}
              <a key="new-playlist" className="text-dark" href={`/playlists/new`}><div className="card text-center bg-light">
                <img style={square} className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRybEoxX-zFDrhiWh8S9UB-ij1uf8jNp87KlIG-g04MYjtKvKMU&usqp=CAU" alt="Card image cap"></img>
                <div className="card-body">
                  <h5 className="card-title">Add New Playlist</h5>
                </div>
              </div>
              </a>
            </div>
          </div>
          <footer className="footer">
            <div className="container-fluid bg-dark  text-center h4 mb-0 mt-5 pt-2 pb-2 position-absolute fixed-bottom">
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

module.exports = Playlists;

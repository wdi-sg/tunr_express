var React = require("react");
class Artists extends React.Component {
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

    var artists = this.props.artists;
    if (artists.length == 0) {
      artists = [];
    }
    else {
      artists = artists.map((element) => {
        return <a key={element.name} className="text-dark" href={`/artists/${element.id}`}><div className="card text-center bg-light">
          <img style={square} className="card-img-top" src={`${element.photo_url}`} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title"> {element.name}</h5>
            <p className="card-text">Nationality: {element.nationality}</p>
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
                <a className="nav-item nav-link active" href="/artists">Artists <span className="sr-only">(current)</span></a>
                <a className="nav-item nav-link" href="/playlists">Playlists</a>
              </div>
            </div>
          </nav>
          
          <div className="container-fluid">
            <h1 className="text-center w-75 ml-auto mr-auto bg-dark text-light"><em><u>Artists</u></em></h1>
            <div className="row row-cols-3 w-75 ml-auto mr-auto">
              {artists}
              <a key="new-artist" className="text-dark" href={`/artists/new`}><div className="card text-center bg-light">
                <img style={square} className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRybEoxX-zFDrhiWh8S9UB-ij1uf8jNp87KlIG-g04MYjtKvKMU&usqp=CAU" alt="Card image cap"></img>
                <div className="card-body">
                  <h5 className="card-title">Add New Artist</h5>
                  <p className="card-text">&nbsp;</p>
                </div>
              </div>
              </a>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Artists;

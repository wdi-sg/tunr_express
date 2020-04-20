var React = require("react");
class SingleArtist extends React.Component {
  render() {
    const square = {
        width: '250px',
        height: '250px',
        backgroundImage: 'url(https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg)',
        backgroundSize:  'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover'
      };
      const square2 = {
        width: '250px',
        height: '250px',
        backgroundImage: 'url(https://www.indiaspora.org/wp-content/uploads/2018/10/image-not-available.jpg)',
        backgroundSize:  'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        objectFit: 'cover'
      };
  
    var artists = this.props.artists;
    if (artists.length == 0) {
      artists = [
        <a key= "null" className = "text-dark" href={`/artists`}><div className="card text-center bg-light">
        <div className="card-body">
          <h5 className="card-title"> No matching artist. Go back?</h5>
        </div>
      </div>
      </a>
      ]
    }
    else {
      artists = artists.map((element) => {
      return <div className="card text-center bg-light">
        <img style = {square} className="card-img-top mx-auto" src={`${element.photo_url}`} alt="Card image cap"></img>
        <div className="card-body">
          <h2 className="card-title text-dark">{element.name}</h2>
          <p className="card-text text-dark">Nationality: {element.nationality}</p>
          <a href={`/artists/${element.id}/edit`} className = "btn btn-secondary">Edit Details</a>
          <br/>
        </div>
        <a className="btn btn-block btn-dark pl-0 pr-0 ml-0 mr-0" href={`/artists/${element.id}/songs`}><h4 >View Songs</h4></a>
      </div>
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
            <div className = "container w-75 ml-auto mr-auto pl-0 pr-0">
              {artists}
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = SingleArtist;

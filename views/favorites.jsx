var React = require("react");

class Favorites extends React.Component {
  render() {

    const Navbar = require("./navbar.jsx");

    let favSongs = this.props.favoriteSongs.map(x=>{
        var title = x.title;
        var album = x.album;
        var preview = x.preview_link;

    return  <div className="card">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{album}</p>
                <audio className="music" controls>
                  <source src={preview} type="audio/ogg"/>
                  <source src={preview} type="audio/mpeg"/>
                  Your browser does not support the audio tag.
                </audio>
              </div>
            </div>

    });


    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
            <link rel="stylesheet" href="/style.css"></link>
        </head>
        <body>
        <Navbar/>
          <div>
            <h1 className="col-md-auto display-4">{this.props.name}'s Favorite Songs</h1>
            <div class="cards">
              {favSongs}
            </div>
            <form method='GET' action={'/favorites/new'} className="forms addSong">
              <button type="submit" class="btn btn-dark">Add songs to your list of favorites</button>
            </form>
          </div>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Favorites;
var React = require("react");

class Home extends React.Component {
  render() {

    return (
      <html>
      <head>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
      </head>
        <body>
          <div class="jumbotron jumbotron-fluid">
                 <div class="container home-container">
                <h1 class="display-4">Welcome!</h1>
                <nav className="navbar-home">
                <ul class="nav nav-pills nav-fill">
                  <li class="nav-item">
                    <a class="nav-link active" href="/new">Add an Artist</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/playlist-index">Playlists</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/display-artists">List of Artists</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/favorites">Favorites</a>
                  </li>
                </ul>
                </nav>
              </div>
            </div>
        <footer className="home-footer">
        <p> No of visits: {this.props.cookieCount}</p>
        </footer>
        </body>
      </html>
    )
  }
}

module.exports = Home;
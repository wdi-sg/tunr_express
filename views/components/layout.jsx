var React = require('react');

class Layout extends React.Component {
  render() {
    return(
        <html>
            <head>
            <link href="https://fonts.googleapis.com/css?family=Permanent+Marker|Questrial&display=swap" rel="stylesheet"/>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"/>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
            <link rel="stylesheet" type="text/css" href="/style.css"/>
            </head>

            <body>

            <nav class="navbar navbar-expand-lg navbar-light bg-light">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="submit-nav collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" href="/songs/new">Add Song</a>
                  </li>
                  </ul>
                  </div>
                  <a class="navbar-brand" href="/artist">88↑</a>
                  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                  <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" href="/new">Add Artist</a>
                  </li>
                  </ul>
                  <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Favorites
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href="/favorites/new">Add songs to favorites</a>
                      <a class="dropdown-item" href="/favorites">Your Favorites</a>
                        </div>
                      </li>
                    </ul>
                  <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Account
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href="/register">New User</a>
                      <a class="dropdown-item" href="/login">Login</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div id="header-img">
                    <h1>Eargasm</h1>
                    <p>As you like it.</p>
                </div>
                    {this.props.children    }

                <footer class="page-footer font-small">
                  <div class="footer-copyright text-center py-3">© 2019 Copy not righted:
                    <a href="/recipes"> Tunr</a>
                  </div>

                </footer>
            </body>
        </html>
    )
  }
}


module.exports = Layout;
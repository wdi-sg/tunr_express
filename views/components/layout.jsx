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
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
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
                    <a class="nav-link" href="/artists">Home</a>
                  </li>
                  </ul>
                  </div>
                  <a class="navbar-brand" href="/artists">88↑</a>
                  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                  <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" href="/new">Add Artist</a>
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
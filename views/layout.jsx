const React = require("react");

export class Layout extends React.Component {
  render() {
    let loginOrLogoutRoute;
    let loginOrLogoutName;
    let favorites;
    if (this.props.username === undefined) {
      loginOrLogoutRoute = "/login";
      loginOrLogoutName = "Log In";
    } else {
      loginOrLogoutRoute = "/logout";
      loginOrLogoutName = "Log Out";
      favorites = (
        <li className="nav-item">
          <a className="nav-link" href="/favorites">
            Favorites
          </a>
        </li>
      );
    }
    return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Tunr</title>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <a className="navbar-brand" href="/">
              Tunr
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/artists">
                    Artists <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" href="/playlists">
                    Playlists <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/artists/new">
                    Add artist
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/playlists/new">
                    Add playlist
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Sort
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/sort/name">
                      Sort by alphabetical order
                    </a>
                    <a class="dropdown-item" href="/sort/dateCreated">
                      Sort by date created
                    </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                      Nothing here either
                    </a>
                  </div>
                </li>
                {favorites}
              </ul>
              <span class="navbar-text">
                <span className="mr-2">{this.props.username}</span>
                <a className="" href={loginOrLogoutRoute}>
                  {loginOrLogoutName}
                </a>
              </span>
            </div>
          </nav>
          {this.props.children}
          <script
            src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
            integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
            integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossOrigin="anonymous"
          ></script>
        </body>
      </html>
    );
  }
}

module.exports = Layout;

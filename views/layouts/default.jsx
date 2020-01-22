var React = require('react');

class DefaultLayout extends React.Component {
  render() {
    return (
              <html>
      <head>
      <title>{this.props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

      </head>
        <body>
          <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h2>tunr</h2>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
          <li className="nav-item">
        <a className="nav-link mt-4" href="/">Artists</a>
      </li>
                         <li className="nav-item">
      <a className="nav-link mt-4" href="/playlists">Playlist</a>
      </li>
       <li className="nav-item">
      <a className="nav-link mt-4" href="/new">Add Artists</a>
      </li>
             <li className="nav-item">
      <a className="nav-link mt-4" href="/playlists/new">Add Playlist</a>
      </li>
          </ul>
      </div>
        </nav>
          {this.props.children}</div>
        </body>
      </html>
    );
  }
}

module.exports = DefaultLayout;
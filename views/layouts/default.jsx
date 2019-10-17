var React = require('react');

class DefaultLayout extends React.Component {
  render() {

    return (
<html lang="en">
  <head><title>{this.props.pageTitle}</title>
        <link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossOrigin="anonymous"/>
  <link rel="stylesheet" href='../../style.css'/>
  </head>
<body id="page-top">
<div className="container">
  <div className="row mx-auto">
    <div className="col-12 border">
    <h1>{this.props.pageTitle}</h1>
    </div>
    {/*end header row*/}
  </div>
  {/*start internal content area*/}
  <div className="row">
    <div className="col-3">
    <nav className="nav flex-column">
    <a className="nav-link" href="/">Top</a>
    <a className="nav-link" href="/">Show All Artists</a>
    <a className="nav-link" href="/artists/new">Add a New Artist</a>
    <a className="nav-link" href="/playlist">Show All Playlists</a>
    <a className="nav-link" href="/playlist/new">Add a New Playlist</a>
    <br/>
    <a className="nav-link" href="/favorites/new">Add a Favorite</a>
    <a className="nav-link" href="/favorites">See All Favorites</a>
    <br/>
    <a className="nav-link" href="/register">Register</a>
    <a className="nav-link" href="/login">Login</a>
    </nav> 
    </div>
    <div className="col-9">
    {this.props.children}
    </div>
{/*    // end interal row*/}
  </div>

</div>
</body>
</html>
    );
  }
}

module.exports = DefaultLayout;
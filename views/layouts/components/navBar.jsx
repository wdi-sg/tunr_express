const React = require('react');

class NavBar extends React.Component {
  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">TUNR</a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/artists">Artists</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/artists/new">Create Artist</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/ingredients">Songs</a>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
}

module.exports = NavBar;
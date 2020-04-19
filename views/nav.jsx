const React = require('react');

class Nav extends React.Component {
  render() {
    return (
      <nav className="nav nav-pills nav-justified list-group list-group-horizontal">
        <a className="nav-item nav-link list-group-item-action text-info h4" href="/">Home</a>
        <a className="nav-item nav-link list-group-item-action text-info h4" href="/artists">Artists</a>
        <a className="nav-item nav-link list-group-item-action text-info h4" href="/songs">Songs</a>
        <a className="nav-item nav-link list-group-item-action text-info h4" href="/playlists">Playlists</a>
      </nav>
    );
  }
}

module.exports = Nav;

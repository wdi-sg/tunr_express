const React = require('react');

class Nav extends React.Component {
  render() {
    return (
      <nav class="nav nav-pills nav-justified list-group list-group-horizontal">
        <a class="nav-item nav-link list-group-item-action text-info h4" href="/">Home</a>
        <a class="nav-item nav-link list-group-item-action text-info h4" href="/artists">Artists</a>
        <a class="nav-item nav-link list-group-item-action text-info h4" href="/songs">Songs</a>
        <a class="nav-item nav-link list-group-item-action text-info h4" href="/playlists">Playlists</a>
      </nav>
    );
  }
}

module.exports = Nav;

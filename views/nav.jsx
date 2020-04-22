const React = require('react');

class Nav extends React.Component {
  render() {
    let loginout =
      <a className="nav-item nav-link list-group-item-action text-info"
         href="/login">Login</a>;
    let register =
      <a className="nav-item nav-link list-group-item-action text-info"
         href="/register">Register</a>
      if (this.props.auth) {
        loginout =
          <a className="nav-item nav-link list-group-item-action text-info"
             href="/logout">Logout</a>;
        register = "";
      }

      return (
      <nav className="navbar nav-pills nav-justified list-group list-group-horizontal bg-light">
        <a className="nav-item nav-link list-group-item-action text-info" href="/">Home</a>
        <a className="nav-item nav-link list-group-item-action text-info" href="/artists">Artists</a>
        <a className="nav-item nav-link list-group-item-action text-info" href="/songs">Songs</a>
        <a className="nav-item nav-link list-group-item-action text-info" href="/playlists">Playlists</a>
        {register}
        {loginout}
      </nav>
      );
  }
}

module.exports = Nav;

const React = require("react");

class Home extends React.Component {
  render() {
    let {name} = this.props;
    return (
      <html>
        <head />
        <body>
          {name === undefined ? (
            <span>
              <a href="/register">
                <button>Register</button>
              </a>
              <a href="/login">
                <button>Login</button>
              </a>
            </span>
          ) : (
            <span></span>
          )}
          <h1>Welcome! {name}</h1>
          <a href="/artists">
            <button>View artists</button>
          </a>
          <a href="/playlist">
            <button>View playlists</button>
          </a>
          {name === undefined ? (
            <span></span>
          ) : (
            <a href="/favorites">
              <button>View favorites</button>
            </a>
          )}
        </body>
      </html>
    );
  }
}

module.exports = Home;

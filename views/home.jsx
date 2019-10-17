const React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <a href="/artists"><button>View artists</button></a>
          <a href="/playlist"><button>View playlists</button></a>
        </body>
      </html>
    );
  }
}

module.exports = Home;

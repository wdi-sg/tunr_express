var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Hello World</h1>
          <div>
            <a href="/artists">See All Artists</a>
          </div>
          <div>
            <a href="/playlist">See Your Playlists</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
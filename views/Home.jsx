const React = require('react');

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div>
            <a href="/artists">Artists</a>
          </div>
          <div>
            <a href="/songs">Songs</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;

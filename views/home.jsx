var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <h2><a href="/artists/">Show all artists</a></h2>
        </body>
      </html>
    );
  }
}

module.exports = Home;

var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
            <a type="button" href="/artists">Click here for the artist directory!</a>
        </body>
      </html>
    );
  }
}

module.exports = Home;

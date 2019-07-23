var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Hello World!</h1>
          <div>
            <a href = "/artists">View all artists</a>
          </div>
          <div>
            <a href = "/artists/add">Add new artist</a>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;
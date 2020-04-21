var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
        </body>
        <footer>Number of visits to page: {this.props.count}</footer>
      </html>
    );
  }
}

module.exports = Home;

var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Hello World!</h1>
          <footer>Number of visits: {this.props.counter}</footer>
        </body>
      </html>
    );
  }
}

module.exports = Home;

var React = require("react");

class Main extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Hello World!</h1>
          <p>The number of page count is: {this.props.cookie}</p>
        </body>
      </html>
    );
  }
}

module.exports = Main;
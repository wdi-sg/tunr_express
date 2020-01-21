var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>{this.props.message}</h1>
        </body>
      </html>
    );
  }
}

module.exports = Home;

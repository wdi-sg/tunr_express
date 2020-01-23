var React = require("react");

class Layout extends React.Component {
  render() {
    return (
      <html>
        <head <link rel="stylesheet" type="text/css" href="style.css"> />
        <body>
          <h1>TUNR EXPRESS</h1>
          <div>
          {this.props.children}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Layout;

var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <form method="POST" action="/artists">
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
var React = require("react");

class redirectHome extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>You added a new artist!</h1>
          <form method='GET' action='/index'>

          <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = redirectHome;
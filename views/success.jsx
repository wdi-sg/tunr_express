var React = require("react");

class Success extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Successfully updated database!</h1>
          <form method='GET' action='/'>
            <input type='submit' value='Home'/>
          </form>
        </body>
      </html>
      );
  }
}

module.exports = Success;
var React = require("react");

class CreateAcc extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <p>Your account have been created. You will be redirected to the login page shortly.</p>
            <script type="text/javascript" src="/acccreated.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = CreateAcc;
var React = require("react");

class Noacc extends React.Component {
  render() {
    var url = '/homepage'
    var urlLogin = '/login'
    var urlCreate = '/create'
    return (
      <html>
        <head />
        <body>
            <p>You have no account. Please create one.</p>
            <script type="text/javascript" src="/noacc.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Noacc;
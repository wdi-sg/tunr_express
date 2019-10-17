var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h3>Register An Account</h3>
            <form method="POST" action="/register">
                Name: <input type="text" name="name" required/><br/>
                Password: <input type="text" name="password" required/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;
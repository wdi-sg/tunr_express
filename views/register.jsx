var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Register</h3>
            <form method="POST" action="/register">
                Username <input type="text" name="name"/>
                Password <input type="text" name="password"/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;
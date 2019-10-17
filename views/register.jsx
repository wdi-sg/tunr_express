var React = require("react");

class Register extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>Registration</h1>
          <form method="POST" action="/register">
              Username: <input type="text" name="username" />
              <br />
              Password: <input type="text" name="password" />
              <br />
              <input type="submit" value="Register" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;

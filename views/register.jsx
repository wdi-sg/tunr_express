var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          <h3>Register Form Goes Here!</h3>
          <form method="POST" action="/register">
          <p> Username <input type="text" name="username"/></p>
          <p> Password <input type="text" name="password"/></p>
          <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;
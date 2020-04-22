var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <p>Register</p>
          <form method='POST' action='/register'>
            <p>Username</p>
            <input type='text' name='username'/>
            <p>Password</p>
            <input type='password' name='password'/>
            <br/><br/>
            <input type='submit' value='Submit'/>
          </form>
        </body>
      </html>
      );
  }
}

module.exports = Register;
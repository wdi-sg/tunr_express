var React = require("react");

class Login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Log In</h3>
          <form method='POST' action='/login'>
            <h4>Username</h4>
            <input type='text' name='username'/>
            <h4>Password</h4>
            <input type='password' name='password'/>
            <br/><br/>
            <input type='submit' value='Submit'/>
          </form>
        </body>
      </html>
      );
  }
}

module.exports = Login;
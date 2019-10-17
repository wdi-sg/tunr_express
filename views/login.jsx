var React = require("react");

class Login extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>Login</h1>
          <form method="POST" action="/login">
              Username: <input type="text" name="username" />
              <br />
              Password: <input type="text" name="password" />
              <br />
              <input type="submit" value="Login" />
          </form>
          <div>
            Click <a href="/register">here</a> to register
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Login;

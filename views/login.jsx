var React = require('react');
class Login extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          <div>
            <h1>Login</h1>
          </div>
          <div>
            <div>
              <form method="POST" action="/login">
                <div>
                  Name:
                  <input type="text" name="username"></input>
                </div>
                <div>
                  Password:
                  <input type="text" name="password"></input>
                </div>
                <div>
                  <input type="submit" value="submit"></input>
                </div>
              </form>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Login;
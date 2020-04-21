var React = require('react');
class Register extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
          <div>
            <h1>Register Account</h1>
          </div>
          <div>
            <div>
              <form method="POST" action="/register">
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

module.exports = Register;
var React = require('react');

class Login extends React.Component {
  render() {
    return (
      <html>
      <head>
          <title>Login page</title>
      </head>
        <body>
          <div>
            <h2>Login</h2>
            <form action="/login" method="POST">
                <p>
                    Name <input name="name" required/>
                </p>
                <p>
                    Password <input type="password" name="password" required/>
                </p>

                <p>
                    <input type="submit" value="Login"/>
                </p>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Login;
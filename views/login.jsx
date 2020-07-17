var React = require('react');

class Login extends React.Component {
  render() {
    return (
      <html>
        <body>
          <h3>LOGIN</h3>
          <form method="POST" action="/login">
            <p>
                name
                <input name="name"/>
            </p>
            <p>
                password
                <input name="password" />
            </p>
            <p>
                <input type="submit"/>
            </p>
          </form>
          <form method="GET" action="/">
                  <input type="submit" value="Back"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Login;

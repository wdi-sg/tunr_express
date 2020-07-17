var React = require('react');

class Login extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Login Page</h1>
            <form action="/login" method="POST">
                Name: <input name="name"/><br/>
                Password: <input name="password"/><br/>
                <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Login;
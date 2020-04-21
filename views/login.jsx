var React = require('react');

class Login extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h2>Login</h2>
            <form action="/login" method="POST">
                <p>
                    Name <input name="name" required/>
                </p>

                <p>
                    Password <input type="password" name="password"/>
                </p>

                <p>
                    <input type="submit"/>
                </p>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Login;
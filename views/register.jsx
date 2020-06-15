var React = require('react');

class Register extends React.Component {
  render() {
    return (
      <html>
      <head>
          <title>Sign up</title>
      </head>
        <body>
          <div>
            <h2>Sign up</h2>
            <form action="/register" method="POST">
                <p>
                    Name <input name="name" required/>
                </p>
                <p>
                    Password <input type="password" name="password" required/>
                </p>

                <p>
                    <input type="submit" value="Register"/>
                </p>
            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Register;
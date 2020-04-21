var React = require('react');

class Register extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h2>Register here</h2>
            <form action="/register" method="POST">
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

module.exports = Register;
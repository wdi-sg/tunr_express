var React = require('react');

class Register extends React.Component {
  render() {
    return (
      <html>
        <body>
          <form method="POST" action="/register">
            <p>
                name
                <input name="name"/>
            </p>
            <p>
                password
                <input name="password"/>
            </p>
            <p>
                <input type="submit"/>
            </p>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;
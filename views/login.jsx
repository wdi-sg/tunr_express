var React = require('react');

class Login extends React.Component {
  render() {
    return (
      <html>
        <body>
        <h1> LOGINNNNNN </h1>
          <form method="POST" action="/login">
            <p>
                Name <br/>
                <input name="name"/>
            </p>
            <p>
                Password <br/>
                <input name="password" type="password"/>
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

module.exports = Login;
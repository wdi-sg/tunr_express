var React = require('react');

class Register extends React.Component {
  render() {
    console.log("hi");
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
          <form method="GET" action="/">
                  <input type="submit" value="Back"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;

var React = require('react');

class Register extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>TUNR_DB</h1>
            <form action="/users" method="POST">
                <p>
                    name
                    <input name="name"/>
                </p>
                <p>
                    password
                    <input name="password"/>
                </p>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Register;
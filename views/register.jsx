var React = require('react');

class Register extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>Profile set-up</h1>
            <form action="/register" method="POST">
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

module.exports = Register;
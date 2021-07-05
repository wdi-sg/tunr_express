var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <body>
            <form method="POST" action="/login">
              <h3>LOG IN</h3>
                NAME: <input type="text" name="name" placeholder="name"/>
                <br/>
                PASSWORD: <input type="text" name="password" placeholder="password"/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;
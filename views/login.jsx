var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h3>Login!</h3>
            <form method="POST" action="/login">
                Username: <input type="text" name="username"/><br/>
                Password: <input type="text" name="password"/><br/>
                <input type="submit"/>
            </form>
            <form method="GET" action="/">
                <p>
                    Click here to go back: <br/>
                    <input type="submit" value="Back"/>
                </p>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
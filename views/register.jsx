var React = require("react");

class register extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create An Account</h3>
          <form method="POST" action="/register">
          <div>Username: <input type="text" name="username"/></div>
          <div>Password: <input type="text" name="password"/></div>
          <br />
          <div><input type="submit" value="Submit"/></div>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = register;
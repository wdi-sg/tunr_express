var React = require("react");
class LoginForm extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Log in</h1>
          <form action="/" method="POST">
            <input name="username" type="text" placeholder="Username"></input>
            <input name="password" type="text" placeholder="Password"></input>
            <button>Submit</button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = LoginForm;

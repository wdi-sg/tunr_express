var React = require("react");

class Login extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <p> Account Login !!! </p>
            <form method="post" action="/login">
            <label for="id">Username</label>
            <input type="text" name="username"/>

            <label for="id">Password</label>
            <input type="text" name="password"/> <br/>

            <input type="submit" value="Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Login;
var React = require("react");

class Register extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <p> Register Account </p>
            <form method="post" action="/register">
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

module.exports = Register;
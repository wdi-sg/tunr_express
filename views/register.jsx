var React = require("react");
var DefaultLayout = require("./layout/default");

class Register extends React.Component {
  render() {
    return (
          <DefaultLayout>
          <form action="/register" method="POST">
          <label>Username:</label><br/>
          <input type="text" name="username"/><br/><br/>
          <label>Your password</label><br/>
          <input type="text" name="password"/><br/><br/>
          <input type="submit" value="Register"/>
          </form>
          </DefaultLayout>
    );
  }
}

 module.exports = Register;
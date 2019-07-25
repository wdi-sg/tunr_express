var React = require("react");
var Layout = require("./component/layout-allpage.jsx");
class Register extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <form action="/register" method="POST">
          <label>Your user name</label><br/>
          <input type="text" name="user_name"/><br/><br/>
          <label>Your password</label><br/>
          <input type="text" name="user_password"/><br/><br/>
          <input type="submit" value="Create user"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;

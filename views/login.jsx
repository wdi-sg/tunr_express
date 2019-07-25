var React = require("react");
var Layout = require("./layout");

class Login extends React.Component {
  render() {
    return (
      <Layout>
          <h3>Form Goes Here!</h3>
          <form className="input-form" method="POST" action="/login">
            <input type="text" name="user" placeholder="Input username"/>
            <input type="text" name="password" placeholder="Input password"/>
            <input type="submit" value="Log in"/>
          </form>
      </Layout>
    );
  }
}

module.exports = Login;
var React = require("react");
var Layout = require("./layout");

class Register extends React.Component {
  render() {
    return (
      <Layout>
          <h3>Form Goes Here!</h3>
          <form className="input-form" method="POST" action="/register">
            <input type="text" name="user" placeholder="Input username"/>
            <input type="text" name="password" placeholder="Input password"/>
            <input type="submit" value="Create Account"/>
          </form>
      </Layout>
    );
  }
}

module.exports = Register;
const React = require("react");
const GetUserCredentials = require("./comp/GetUserCredentials");

class Login extends React.Component {
  render() {
    return (
      <div>
        <GetUserCredentials type="Login" />
      </div>
    );
  }
}

module.exports = Login;
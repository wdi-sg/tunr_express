const React = require("react");
const GetUserCredentials = require("./components/GetUserCredentials");

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

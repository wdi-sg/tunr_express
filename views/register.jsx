const React = require("react");
const GetUserCredentials = require("./components/GetUserCredentials");

class Register extends React.Component {
  render() {
    return (
      <div>
        <GetUserCredentials type="Register" />
      </div>
    );
  }
}

module.exports = Register;

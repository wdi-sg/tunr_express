var React = require("react");
class RegistrationForm extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Register an account</h1>
          <form action="/registeredAccount" method="POST">
            <input name="username" type="text" placeholder="Username"></input>
            <input name="password" type="text" placeholder="Password"></input>
            <button>Submit</button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = RegistrationForm;

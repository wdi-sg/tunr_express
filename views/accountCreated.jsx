var React = require("react");
class AccountCreated extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Thank you for signing up</h1>
          <p>
            Account with Username: {this.props.newUser.name} has been created
          </p>
        </body>
      </html>
    );
  }
}

module.exports = AccountCreated;

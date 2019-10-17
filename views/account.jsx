var React = require("react");

class Account extends React.Component {
  render() {
    let formAction;
    if (this.props.message === "Register An Account") {
        formAction = "/register";
    } else {
        formAction = "/login";
    }
    return (
      <html>
        <head />
        <body>
            <h3>{this.props.message}</h3>
            <form method="POST" action={formAction}>
                Name: <input type="text" name="name" required/><br/>
                Password: <input type="text" name="password" required/><br/>
                <input type="submit" value="Submit"/>
            </form>
            <p><a href="http://localhost:3000/artists" alt="homepage">Back to Homepage</a></p>
        </body>
      </html>
    );
  }
}

module.exports = Account;
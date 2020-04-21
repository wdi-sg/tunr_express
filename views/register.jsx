var React = require("react");
var DefaultLayout = require("./layouts/default");

class Register extends React.Component {
  render() {
    return (
        <DefaultLayout title="Register new account" loggedIn={this.props.loggedIn}>
            <h1>Register new account:</h1>
              <form action="/register" method="POST">
                <p>name:
                <input type="text" name="username"/></p>
                <p>password:
                <input type="password" name="password"/></p>
                <input type="submit" className="btn btn-primary"/>
              </form>
        </DefaultLayout>
    );
  }
}

module.exports = Register;

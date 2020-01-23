var React = require("react");
var DefaultLayout = require("./layouts/default");

class SignIn extends React.Component {
  render() {
    return (
        <DefaultLayout title={this.props.message}>
            <h1>Sign In:</h1>
              <form action="/signin" method="POST">
                <p>name:
                <input type="text" name="username"/></p>
                <p>password:
                <input type="password" name="password"/></p>
                <p><input type="checkbox" name="keepsignedin"/> Keep me signed in <small>lol I don't do anything.</small></p>
                <input type="submit" className="btn btn-primary"/>
              </form>
        </DefaultLayout>
    );
  }
}

module.exports = SignIn;

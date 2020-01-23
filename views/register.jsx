var React = require("react");
var DefaultLayout = require("./layouts/default");

class Home extends React.Component {
  render() {
    return (
        <DefaultLayout title={this.props.message}>
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

module.exports = Home;

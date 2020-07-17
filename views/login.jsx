var React = require("react");
var DefaultLayout = require("./layout/default");

 class Login extends React.Component {
  render() {

    return (
      <DefaultLayout cookies={this.props.cookies}>
        <div id="holding-page">
        <form action="/login" method="POST">
        <label>Username:</label><br/>
        <input type="text" name="username"/><br/><br/>
        <label>Password:</label><br/>
        <input type="text" name="password"/><br/><br/>
        <input type="submit" value="Login"/>
        </form>
        </div>
      </DefaultLayout>
    );
  }
}

 module.exports = Login;
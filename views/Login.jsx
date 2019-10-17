const React = require("react");

class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form action={'/login'} method="POST">
            <input type="text" name="name" placeholder="enter username"/><br/>
            <input type="submit" value="Log in" />
        </form>
        <a href="/">return to main</a>
      </div>
    );
  }
}

module.exports = Login;

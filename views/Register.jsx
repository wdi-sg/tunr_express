const React = require("react");

class Register extends React.Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form action={'/register'} method="POST">
            <input type="text" name="name" placeholder="enter username"/><br/>
            <input type="password" name="password" placeholder="enter password"/><br/>
            <input type="submit"/>
        </form>
        <a href="/">return to main</a>
      </div>
    );
  }
}

module.exports = Register;

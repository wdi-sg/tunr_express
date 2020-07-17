var React = require("react");

class Login extends React.Component {
  render() {
    var url = '/homepage'
    var urlLogin = '/login'
    var urlCreate = '/create'
    return (
      <html>
        <head />
        <body>
            <h1>Login</h1>
            <form method="POST" action={urlLogin}>
                <h2>Enter username</h2>
                <input type="text" name="name"/>
                <h2>Enter password</h2>
                <input type="text" name="password"/>
                <br />
                <input type="submit"/>
            </form>
            <a href={urlCreate}>Create account</a>
            <a href={url}>Home</a>
        </body>
      </html>
    );
  }
}

module.exports = Login;
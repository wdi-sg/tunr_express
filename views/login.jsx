var React = require("react");

class Login extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h3>Login here ... </h3>
            <form method="POST" action={"/login"}>
            <table>
                <tr>
                    <td><font color='red'>{this.props.message}</font></td>
                    <td></td>
                </tr>
                <tr>
                    <td>User Name</td>
                    <td><input name="name" value={this.props.name} /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input  name="password" value={this.props.password} type='password' /></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type='submit' /></td>
                </tr>
            </table>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Login;

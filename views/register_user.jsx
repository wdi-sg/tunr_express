var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create New User</h3>
            <form method="POST" action={"/register"}>
            <table>
                <tr>
                    <td>User Name</td>
                    <td><input name="name" value={this.props.name} /></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input name="password" value={this.props.password} /></td>
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

module.exports = New;

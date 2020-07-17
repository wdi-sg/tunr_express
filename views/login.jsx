var React = require("react");
var Default = require("./layout/default");

class Login extends React.Component {
  render() {

    return (
      <Default title={this.props.title} cookieLogin={this.props.cookieLogin}>
      <div className="solo-artist">
      <h2 className="login">Login</h2>
          <form method="POST" action="/login/check_user">
                <table className="table table-bordered">
                    <tr>
                        <th scope="row">Name</th>
                        <td><input type="text" name="name"/></td>
                    </tr>
                    <tr>
                        <th scope="row">Password</th>
                        <td><input type="password" name="password"/></td>
                    </tr>
                </table>
                <input type="submit" value="Login" style={{display:"block",margin:"0 auto"}}/>
            </form>
            <form action="/login/register" className="register-button">
                <input type="submit" value="Register"/>
            </form>
      </div>

      </Default>
    );
  }
}

module.exports = Login;

var React = require("react");
var Default = require("./layout/default");

class Register extends React.Component {
  render() {

    return (
      <Default title={this.props.title} cookieLogin={this.props.cookieLogin}>
      <div className="solo-artist">
      <h2 className="login">Register</h2>
          <form method="POST" action="/login/create_new_user">
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
                <input type="submit" value="Register" style={{display:"block",margin:"0 auto"}}/>
            </form>
      </div>

      </Default>
    );
  }
}

module.exports = Register;

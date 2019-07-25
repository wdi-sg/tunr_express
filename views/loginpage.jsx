var React = require("react");
var Layout = require("./component/layout-allpage.jsx");


class Login extends React.Component {
  render() {
    //code goes here


    //user will put content in here. content will differ from page to page
    return (
      <Layout cookies={this.props.cookies}>
        <div id="artist-holding-page">
        <form action="/login" method="POST">
        <label>Username</label><br/>
        <input type="text" name="username"/><br/><br/>
        <label>Password</label><br/>
        <input type="text" name="password"/><br/><br/>
        <input type="submit" value="Login"/>
        </form>
        </div>
      </Layout>
    );
  }
}

module.exports = Login;

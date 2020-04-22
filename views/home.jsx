var React = require("react");

class Home extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <a href='/register' id='register'><button>Register</button></a>
          <br/>
          <a href='/login' id='login'><button>Log In</button></a>
        </body>
        <footer>Number of visits to page: {this.props.count}
        <script>var loggedIn = `{this.props.loggedIn}`;</script>
          <script src='/script.js'></script></footer>
      </html>
    );
  }
}

module.exports = Home;

var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Sign up with a few easy steps.</h3>
          <div>
            <form action="/register" method="post">
              <input type="text" name="username" placeholder="username"></input><br></br>
              <input type="text" name="password" placeholder="password"></input><br></br>
              <input type="text" name="password2" placeholder="confirm password"></input><br></br>
              <input type="submit" value="register"></input><br></br>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;
var React = require("react");
class login extends React.Component {
  render() 
  {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/login">
                  <p>User Name :</p>
                  <input type="text" name="username"/>
                  <p>Password :</p>
                  <input type="text" name="password"/>
                  <p><button type="submit">Log In</button></p>
              </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = login;

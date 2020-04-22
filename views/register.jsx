var React = require("react");
class register extends React.Component {
  render() 
  {
    return (
      <html>
        <body>
          <div>
            <form method="POST" action="/register">
                  <p>User Name :</p>
                  <input type="text" name="username"/>
                  <p>Password :</p>
                  <input type="text" name="password"/>
                  <p><button type="submit">Register</button></p>
              </form>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = register;

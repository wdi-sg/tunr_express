var React = require("react");

class Loginform extends React.Component {
  render() {
    return (
      <html>
        <head>
        </head>
        <body>
            <form action="/login" method="POST">
                        <h1>LOGIN USER PAGE!</h1>
                        <p>
                        Name:
                      <input type="text" name="name"/><br/>
                      </p>
                      <p>
                        Password:
                      <input type="text" name="password"/><br/>
                      </p>
                      <input type="submit" value="submit"/>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = Loginform;
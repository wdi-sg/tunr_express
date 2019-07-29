var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
        </head>
        <body>
          <h3 className="text-center">Login</h3>
          <form method="POST" action="/login?_method=POST" className="text-center">
                <p>User Name</p><input name="username" size="25"/>
                <p>Password</p><input name="password" size="25"/>
                <p><input value="Submit" type="submit"/></p>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;
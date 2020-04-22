var React = require("react");

class LoginPage extends React.Component {
  render() {

    return (
      <html>
      <head>
      <link rel="stylesheet" href="style.css"/>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </head>
        <body>

        <div class="jumbotron">
              <h1 className="display-4">Login and Registration</h1>
              <hr class="my-4"/>
              <a className="btn btn-primary btn-lg login-page-button" href="/register" role="button">Register</a>
              <a class="btn btn-primary btn-lg login-page-button" href="/login" role="button">Login</a>
            </div>
        </body>
      </html>
    )
  }
}

module.exports = LoginPage;
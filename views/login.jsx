var React = require("react");

class Login extends React.Component {
  render() {

    return (
      <html>
      <head>
      <link rel="stylesheet" href="style.css"/>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </head>
        <body>

         <div class="jumbotron">
              <h1 className="display-4">Login</h1>

        </div>

        <div>
        <form method="POST" action="login">
              <div class="form-group col-sm">
                <label for="exampleInputEmail1">Username</label>
                <input type="text" name="name" class="form-control form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div class="form-group col-sm">
                <label for="exampleInputPassword1">Password</label>
                <input type="text" name="password" class="form-control" id="exampleInputPassword1"/>
              </div>
              <button className="lone-btn" type="submit" class="btn btn-primary">Login</button>
          </form>
          </div>
        </body>
      </html>
    )
  }
}

module.exports = Login;
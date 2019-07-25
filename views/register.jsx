var React = require('react');

class Register extends React.Component {
  render() {
    return (
    <html>
        <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>

        <link href="/signin.css" rel="stylesheet"/>
        </head>

        <body class="text-center">
            <form class="form-signin" method="POST" action={"/register"}>
          <img src="/disc.png" width="50" height="50" fill="none"/><br/><br/>
          <h3 class="h3 mb-3 font-weight-normal">Create TUNR Account</h3>
          <label for="inputEmail" class="sr-only">Username</label>
          <input type="text" class="form-control" name="username" placeholder="Username" required autofocus/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" name="password" required/>

          <button class="btn btn-lg btn-primary btn-block" type="submit">Create Account</button>
          <p class="mt-5 mb-3 text-muted">&copy; TUNR 2019</p>
        </form>
        </body>
            </html>
    );
  }
}


module.exports = Register;
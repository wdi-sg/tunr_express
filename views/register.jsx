var React = require('react');

class Register extends React.Component {
  render() {
    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
            <link href="https://fonts.googleapis.com/css?family=Lora|Roboto&display=swap" rel="stylesheet"></link>
        </head>
        <body style={{backgroundImage : 'url("https://wallpaperaccess.com/full/646093.png")', backgroundPosition : "center", backgroundRepeat : "no-repeat", backgroundSize : "cover", height : "100vh", backgroundAttachment : "fixed"}}>

        <div className = "container mx-auto">
        <h1 className="text-center my-5 text-white" style={{fontFamily : "Lora, serif"}}>Hello First Time User! <br/> Please Register Below</h1>

            <form action="/users" method="POST" className = "text-white">
              <div class="form-group">
                <label for="inputUsername">Username</label>
                <input type="username" name="username" class="form-control" id="inputUsername" aria-describedby="emailHelp" placeholder="Enter username" />
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" name="password" class="form-control" id="inputPassword" placeholder="Password" />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Register;
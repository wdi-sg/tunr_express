var React = require("react");

class Login extends React.Component {
  render() {

  let message = ""
      if(this.props.message === "Please Try again"){
       message = <div class="alert alert-danger" role="alert">
    {this.props.message}
  </div>
      } 
    
    
    
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          ></link>
        </head>
        <body>
          <div className="container text-center pt-5">
            <h1 className="display-2 border-bottom">Login</h1>
             {message}
            <form method="POST" action="/login" className="pt-3">
              <p>
                <input
                  type="text"
                  name="username"
                  placeholder="User Name"
                  class="form-control form-control-lg"
                />
              </p>
              <p>
                <input
                  type="text"
                  name="password"
                  placeholder="password"
                  class="form-control form-control-lg"
                />
              </p>

              <button
                type="submit"
                className="btn btn-success btn-lg btn-block"
              >
                Login
              </button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Login;

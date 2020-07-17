var React = require('react');
var HEAD = require('./layouts/head.jsx');

class LoginPage extends React.Component {
  render() {


    return (
      <html>
      	<HEAD>
      		<title> Tunr 1.0 : Login </title>
      	</HEAD>
        <body>
            <form method={'POST'} action={'/login'}>
              <div className={"form-group"}>
                <label for={"username"}>Username</label>
                <input type={"text"} className={"form-control"} id={"username"} aria-describedby={"Username"} placeholder={"Username"} name={'username'} />
              </div>
              <div className={"form-group"}>
                <label for={"password"}>Password</label>
                <input type={"password"} className={"form-control"} id={"password"} aria-describedby={"Password"} placeholder={"Password"} name={'password'} />
              </div>
              <button type={'submit'} className={'btn btn-dark btn-lg'}>Login</button>
            </form>
            <a href={'/register'}><button className={'btn btn-dark btn-lg'}>Sign Up</button></a>            
        </body>
      </html>
    );
  }
}

module.exports = LoginPage;

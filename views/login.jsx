const React = require('react');

class New extends React.Component {
  render(){

    return(
      <html>
        <body>
          <h1>Login</h1>
          <form action="/login" method="POST">
            <p>Username</p>
            <input type="text" name="username"/><br/><br/>
            <p>Password</p>
            <input type="text" name="password"/><br/><br/>
            <input type="submit" value="Login"/>
          </form>
        </body>
      </html>
    )
  }
}

module.exports = New;
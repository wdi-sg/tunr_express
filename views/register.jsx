var React = require("react");

class Register extends React.Component {
  render() {

    let url = '/register';

    return (
      <html>
        <head />
        <body>
          <h1>Welcome Onboard with us!</h1>
          <form method = "POST" action = {url}>

            <h3>Your user Name</h3>
            <input username = "username"/>

            <h3>Your user Password</h3>
            <input userpassword = "userpassword"/>

            <br></br>
            <input type = "submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;
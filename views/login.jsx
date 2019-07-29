
var React = require("react");

class loginForm extends React.Component {
    render() {
        <div>
            <h3>CREATE AN ACCOUNT:</h3>
              <form method="POST" action="/artist">
              <span>Name:</span><input type="text" name="name" value = " "/>
              <span>Password:</span><input type="text" name="password" value = " "/>
              <input type="submit" value="Login"/>
              </form>
        </div>
    }//render CT
}//RegistrationForm CT

module.exports = loginForm;
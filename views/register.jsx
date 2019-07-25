
var React = require("react");

class RegistrationForm extends React.Component {
    render() {
        <div>
            <h3>CREATE AN ACCOUNT:</h3>
              <form method="POST" action="/artist">
              <span>Name:</span><input type="text" name="name" value = " "/>
              <span>Password:</span><input type="text" name="password" value = " "/>
              <input type="submit" value="Submit Artist"/>
              </form>
        </div>
    }//render CT
}//RegistrationForm CT
var React = require('react');

class Register extends React.Component {
  render() {
    return (
      <form method="POST" action="/playlist">
            Register Username & Password:
            <div>
            Name: 
            <input type="text" name="username"/>
            </div>
            <div>
            Password: 
            <input type="text" name="password"/>
            </div>
            <div>
            <input type="submit" value="Submit"/>
            </div>
        </form>
    )
  }
}

module.exports = Register
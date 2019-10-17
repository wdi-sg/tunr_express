var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <div>
        <form action="/" method="post" id="user">
          <div>
            <label htmlFor="name">User name: </label>
            <input type="text" name="name"/>
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="text" name="password"/>
          </div>
        </form>
        <button type="submit" form="user" value="submit">
            Register
        </button>
      </div>
    );
  }
}

module.exports = Register;

var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Register user</h3>
            <form action="/register" method="POST">
                <p>
                    Name<input name="name" type ="text"/>
                </p>
                <p>
                    Password<input name ="password" type =
                    "text"/>
                </p>
                <button type = "submit">Submit</button>
            </form>
            <p>Number of visits:</p>
            <p>{this.props.badge}</p>
        </body>
      </html>
    );
  }
}

module.exports = Register;
var React = require("react");

class Login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h1>{this.props.success}</h1>
        <form action="/login" method="POST">
            <input type="text" name="name" placeholder="name"/>
            <input type="text" name="password" placeholder="password"/>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Login;

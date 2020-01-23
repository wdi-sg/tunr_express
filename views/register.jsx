var React = require("react");

class Register extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <form action="/register" method="POST">
            <input type="text" name="name" placeholder="name"/>
            <input type="text" name="password" placeholder="password"/>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = Register;

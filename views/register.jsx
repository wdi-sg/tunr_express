var React = require("react");

class Register extends React.Component {
  render() {
        // console.log('home.jsx')

    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/style.css" />
        </head>
        <body>
            <div>
                <a href="/">Back to Home</a>
            </div>
            <h3>Registration</h3>
            <form action="/register" method="POST">
                <p>Name: <input name="name" required/></p>
                <p>Password: <input name="password" required/></p>
                <p><input type="submit" value="Register" /></p>
            </form>
        </body>
      </html>
    );
  }
}
module.exports = Register;

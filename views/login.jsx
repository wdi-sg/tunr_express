var React = require("react");

class Login extends React.Component {
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
            <h3>Log-In</h3>
            <form action="/login" method="POST">
                <p>Name: <input name="name" required/></p>
                <p>Password: <input name="password" required/></p>
                <p><input type="submit" /></p>
            </form>
        </body>
      </html>
    );
  }
}
module.exports = Login;

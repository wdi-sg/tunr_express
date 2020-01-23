var React = require("react");

class Login extends React.Component {
    render() {
        return (
            <html>
                <head>
                </head>
                <body>
                  <h2>Login</h2>
                  <form action="/home" method="POST">
                    Name: <input type="text" name="name" placeholder="Name"></input>
                    <br></br>
                    Password: <input type="text" name="password" placeholder="Password"></input>
                    <br></br>
                    <input type="submit" value="Submit"></input>
                    </form>
                </body>
              </html>
                );
            }
        }

module.exports = Login;
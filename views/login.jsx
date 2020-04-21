var React = require("react");

class login extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <div>
                <h1>Please enter your user details for login!!</h1>
                <div>
                    <form action='/login' method="POST">
                        <p>
                            User ID: <input name="userId" />
                        </p>
                        <p>
                            Password: <input name="password"/>
                        </p>

                        <input type="submit" value="Login!"></input>
                    </form>
                </div>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = login;
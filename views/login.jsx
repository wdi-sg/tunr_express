var React = require('react');

class Login extends React.Component {
  render() {
    let msg;
    if( this.props.status === "userwrong"){
        msg = (<h1>Username Invalid, try again!</h1>);
    }
    if( this.props.status === "pwwrong"){
        msg = (<h1>Password Invalid, try again!</h1>);
    }
    return (
      <html>
        <body>
          <div>
            <h1>Login</h1>
            {msg}
            <div>
                <form action="/login" method="POST">
                    <p>
                        name <input name="name"/>
                    </p>
                    <p>
                        password <input name="password"/>
                    </p>
                    <p>

                        <input type="submit"/>
                    </p>
                </form>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Login;
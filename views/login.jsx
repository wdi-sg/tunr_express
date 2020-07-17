var React = require('react');

class login extends React.Component {
  render() {

    return (
      <html>
        <body>
          <div>
            <h1>Logging In</h1>
            <form action="/login" method="POST">
                Enter Your Login Details Here:
                <br></br>
                <input type="text" name="name" placeholder="name"/>
                <br></br>
                <input type="text" name="password" placeholder="password"/>
                <br></br>
                <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = login;
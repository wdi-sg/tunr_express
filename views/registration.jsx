var React = require('react');

class registration extends React.Component {
  render() {

    return (
      <html>
        <body>
          <div>
            <h1>Registration</h1>
            <form action="/register" method="POST">
                Enter Your Details Here:
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

module.exports = registration;
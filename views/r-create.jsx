const React = require('react');

class Create extends React.Component {
  render(){

    return(
      <html>
        <body>
          <h1>Account created</h1>
            <p>Username: {this.props.rows.username} </p>
            <p>Password: {this.props.rows.password}</p>
        </body>
      </html>
    )
  }
}

module.exports = Create;
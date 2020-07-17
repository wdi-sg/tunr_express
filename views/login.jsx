var React = require('react');
var Template = require("./layout/template");

class Login extends React.Component {
  render() {
    return (
      <Template title={this.props.title}>
        <body>
          <div>
            <h1>Hello LOGIN</h1>
            <form action="/login" method="POST">
                <p>
                    name
                    <input name="name"/>
                </p>
                <p>
                    password
                    <input name="password" type="password"/>
                </p>
                <input value ="submit" type="submit"/>
            </form>
          </div>
        </body>
      </Template>
    );
  }
}

module.exports = Login;
var React = require('react');
var Template = require("./layout/template");

class Register extends React.Component {
  render() {
    return (
    <Template title={this.props.title}>
        <body>
          <div>
            <h1>HELLO PLEASE SIGN UP FOR TUNR!</h1>
            <form action="/register" method="POST">
                <p>
                    Username
                    <input name="name"/>
                </p>
                <p>
                    Password
                    <input name="password" type="password"/>
                </p>
                <input type="submit"/>
            </form>
          </div>
        </body>
    </Template>
    );
  }
}

module.exports = Register;
var React = require("react");
var Template = require("./layout/template");

class New extends React.Component {
  render() {
    return (
    <Template title={this.props.title}>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
        </body>
    </Template>
    );
  }
}

module.exports = New;
var React = require("react");
var DefaultLayout = require("./layout/DefaultLayout");

class Secret extends React.Component {
  render() {
    return (
      <Layout cookies={this.props.cookies}>
          <h3>Welcome to secret page {this.props.name}!</h3>
      </Layout>
    );
  }
}

 module.exports = Secret;
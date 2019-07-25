var React = require("react");
var Layout = require("./component/layout-allpage.jsx");
class New extends React.Component {
  render() {
    return (
      <Layout cookies={this.props.cookies}>
          <h3>Welcome to secret page {this.props.name}!</h3>
      </Layout>
    );
  }
}

module.exports = New;

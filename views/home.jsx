const React = require("react");
const Layout = require("./layout")

class Home extends React.Component {
  render() {
    return (
      <Layout>
      <h1>Hello World</h1>
      </Layout>
    );
  }
}

module.exports = Home;

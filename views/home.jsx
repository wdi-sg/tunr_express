var React = require("react");
var Layout = require('./defaultlayout.jsx');

class Home extends React.Component {
  render() {
    return (
      <Layout>
        <h1>Welcome!</h1>
      </Layout>
    );
  }
}

module.exports = Home;

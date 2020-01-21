const React = require("react");
const Layout = require("./layout");

class Error extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <h1 className="text-center mb-10">Error: page not found!</h1>
        </div>
      </Layout>
    );
  }
}

module.exports = Error;

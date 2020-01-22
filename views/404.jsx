const React = require("react");
const Layout = require("./layout");

class Error extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container d-flex flex-column justify-content-center align-items-center">
        <h1>Error!</h1>
        <p>{this.props.errorMessage}</p>
        </div>
      </Layout>
    );
  }
}

module.exports = Error;

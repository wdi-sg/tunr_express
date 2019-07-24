var React = require("react");
var Layout = require("./layout");

class EachArtist extends React.Component {
  render() {
    return (
        <Layout>
          <h1>EachArtist page</h1>
          <p>{this.props[0].name}</p>
       </Layout>
    );
  }
}

module.exports = EachArtist;
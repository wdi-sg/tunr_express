var React = require("react");
var Layout = require("./layout");
var List = require("./list");

class Home extends React.Component {
  render() {

    let artistsList = this.props.artistsData;
    return (
        <Layout>
          <h1>Welcome!</h1>
          <List artistsList={artistsList}></List>
       </Layout>
    );
  }
}

module.exports = Home;
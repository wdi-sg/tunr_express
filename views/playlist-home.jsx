var React = require("react");
const Layout = require("./layout");

class Home extends React.Component {
  render() {
      let listOfSongs = this.props.playlists.map(item => {
      let artistUrl = "/playlist/"+ item.id;
      return <a href={artistUrl}><li>{item.name}</li></a>
    });
    return (
      <Layout>
          <h1 class={this.props.name}>Available playlists:</h1>
          <div class="artists">
            <ul>{listOfSongs}</ul>
          </div>
      </Layout>
    );
  }
}

module.exports = Home;

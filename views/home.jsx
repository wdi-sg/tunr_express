var React = require("react");
const Layout = require("./layout");

class Home extends React.Component {
  render() {
      let listOfArtists = this.props.artists.map(item => {
        let artistUrl = "/artists/"+ item.id;
        return <a href={artistUrl}><li>{item.name}</li></a>
      });
      let listOfSongs = this.props.artists.map(item => {
      let artistUrl = "/artists/"+ item.id;
      return <a href={artistUrl}><li>{item.name}</li></a>
    });
    return (
      <Layout>
          <h1 class={this.props.name}>Here is your list of artists:</h1>
          <div class="artists">
            <ul>{listOfArtists}</ul>
          </div>
      </Layout>
    );
  }
}

module.exports = Home;

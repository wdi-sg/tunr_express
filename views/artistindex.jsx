var React = require("react");
var Layout = require("./layout");

class Artistindex extends React.Component {
  render() {

    const themArtists = this.props.artists.map((artist) => {
        return <li>{artist.name}</li>;
    });

    return (
        <Layout>
          <h1>Available Artists:</h1>
            <ul>
                {themArtists}
            </ul>
        </Layout>
    );
  }
}

module.exports = Artistindex;
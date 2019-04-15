var React = require("react");
var Layout = require("./layout");

class Artistedited extends React.Component {
  render() {

    const themArtists = this.props.artists.map((artist) => {
        return <p>{artist}</p>;
    });

    return (
        <Layout>
          <h1>Updated Artist:</h1>
            <div>
                {themArtists}
            </div>
        </Layout>
    );
  }
}

module.exports = Artistedited;
var React = require("react");
var Layout = require("./layout");

class Artistdeleted extends React.Component {
  render() {



    const themArtists = this.props.artists.map((artist) => {

        return (
            <div>
                <p>Artist Name: {artist.name}</p>
                <p>Nationality: {artist.nationality}</p>
            </div>
                );
    });

    return (
        <Layout>
          <h1>Deleted Artist Successfully!</h1>
            <div>
                {themArtists}
            </div>
        </Layout>
    );
  }
}

module.exports = Artistdeleted;
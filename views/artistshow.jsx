var React = require("react");
var Layout = require("./layout");

class Artistshow extends React.Component {
  render() {

    const theArtist = this.props.artist.map((artist) => {
        return (
            <React.Fragment>
                <li>Artist Name: {artist.name}</li>
                <li>Photo URL: {artist.photo_url}</li>
                <li>Nationality: {artist.nationality}</li>
            </React.Fragment>
                );
    });

    return (
    <Layout>
          <h1>Selected Artist:</h1>
            <ul>
                {theArtist}
            </ul>
    </Layout>
    );
  }
}

module.exports = Artistshow;
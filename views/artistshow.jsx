var React = require("react");
var Layout = require("./layout");

class Artistshow extends React.Component {
  render() {

    const theArtist = this.props.artist.map((artist) => {
        return (
            <React.Fragment>
                <p>Artist Name:</p>
                <p>{artist.name}</p>
                <p>Photo:</p>
                <p><img src={artist.photo_url} alt="artist image"/></p>
                <p>Nationality:</p>
                <p>{artist.nationality}</p>
            </React.Fragment>
                );
    });

    return (
    <Layout>
          <h1>Selected Artist:</h1>
            <div>
                {theArtist}
            </div>
    </Layout>
    );
  }
}

module.exports = Artistshow;
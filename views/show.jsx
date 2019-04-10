var React = require("react");
var Layout = require("./layout");

class Show extends React.Component {
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
      <html>
        <head />
        <body>
          <h1>Selected Artist:</h1>
            <ul>
                {theArtist}
            </ul>
        </body>
      </html>
    );
  }
}

module.exports = Show;
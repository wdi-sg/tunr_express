var React = require("react");

class Deleted extends React.Component {
  render() {



    const themArtists = this.props.artists.map((artist) => {

        return (
            <React.Fragment>
                <p>Artist Name: {artist.name}</p>
                <p>Photo URL: {artist.photo_url}</p>
                <p>Nationality: {artist.nationality}</p>
            </React.Fragment>
                );
    });

    return (
      <html>
        <head />
        <body>
          <h1>Successfully Deleted Artist:</h1>
            <div>
                {themArtists}
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Deleted;
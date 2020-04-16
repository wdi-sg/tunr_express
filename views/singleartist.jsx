var React = require("react");

class Singleartist extends React.Component {
  render() {
    //CSS stuff
    const imageStyle = {
                    "max-width" : "500px",
                    "max-height" : "500px"
                }

    //Javascript stuff
    const artist = this.props.result[0];

    const artistName = artist.name;

    const artistImage = <img src={artist.photo_url} style={imageStyle}></img>

    const artistNationality = <p>Nationality: {artist.nationality}</p>

    return (
      <html>
        <head />
        <body>
          <h1>{artistName}</h1>
          <div>
            {artistImage}
          </div>
          <div>
            {artistNationality}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Singleartist;
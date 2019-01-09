var React = require('react');

class Artist extends React.Component {
    render() {
        let artistsArray = this.props.artists[0];
        let artistName = artistsArray.name;
        let artistImg = artistsArray.photo_url;
        let artistNationality = artistsArray.nationality;

        return (
          <html>
            <head />
            <body>
              <h1>About {artistName}:</h1>
              <img src={artistImg} />
              <p>Nationality: {artistNationality}</p>
            </body>
          </html>
            );
    }
}

module.exports = Artist;
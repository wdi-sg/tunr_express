var React = require("react");

class ShowArtist extends React.Component {
  render() {
        console.log('show-artist.jsx')
        const artistData = this.props.artist;
        console.log(artistData.id);
    return (
      <html>
        <head />
        <body>
          <h3>Artist</h3>
          <p>Name: {artistData.name}</p>
          <p>Photo url: {artistData.photo_url}</p>
          <p>Nationality: {artistData.nationality}</p>
        </body>
      </html>
    );
  }
};

module.exports = ShowArtist;
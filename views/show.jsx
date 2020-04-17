var React = require("react");

class ShowArtist extends React.Component {
  render() {
        console.log("show.jsxxxxxxxxxxxxx");
        const artistData = this.props;
        console.log(this.props);

    return (
      <html>
        <head />
        <body>
          <h3>Artist</h3>
          <p>Name: {this.props.name}</p>
          <p>Photo url: {this.props.photo_url}</p>
          <p>Nationality: {this.props.nationality}</p>
        </body>
      </html>
    );
  }
};

module.exports = ShowArtist;
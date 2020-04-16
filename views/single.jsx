var React = require("react");

class Single extends React.Component {
  render() {
    const artist = this.props.artist;
    return (
      <html>
        <head />
        <body>
          <p>Name: </p>
          <p>{artist.name}</p>
          <p>Nationality: </p>
          <p>{artist.nationality}</p>          
          <img src={artist.photo_url}/>
        </body>
      </html>
    );
  }
}

module.exports = Single; 
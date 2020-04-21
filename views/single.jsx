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
        <footer>Number of visits to page: {this.props.count}</footer>
      </html>
    );
  }
}

module.exports = Single; 
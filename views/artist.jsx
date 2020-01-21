var React = require("react");

//Using string and literals in react.

class Artist extends React.Component {
  render() {
    console.log(this.props.artist.name)
    return (
      <html>
        <head>
        </head>
        <body>
          <h3>{this.props.artist.name}</h3>
          <img src={`"${this.props.artist.photo_url}"`}></img>
          <h3>Nationality: {this.props.artist.nationality}</h3>
        </body>
      </html>
    );
  }
}

module.exports = Artist;
var React = require("react");

//Using string and literals in react.

class Artist extends React.Component {
  render() {
    console.log(this.props.artist.name)
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous">
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
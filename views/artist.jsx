var React = require("react");
class Artist extends React.Component {

  render() {
    console.log(this.props.artist)
    return (
      <html>
        <head />
        <body>
            <p>Artist Name : {this.props.artist[0].name}</p>
            <p><img src = '{this.props.artist[0],photo_url}'></img></p>
            <p>Artist Image Link : {this.props.artist[0].photo_url}</p>
            <p>Artist Nationality : {this.props.artist[0].nationality}</p>
        </body>
      </html>
    );
  }
}

module.exports = Artist;

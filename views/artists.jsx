var React = require("react");
var ArtistProfile  = require('./components/artistProfile.jsx');

class Artists extends React.Component {
  render() {

    const artistsList = this.props.artists.map((artist)=>{
        return <ArtistProfile data={artist}/>
    });
    return (
      <html>
        <head />
        <body>
          <h1>This is Artists Page</h1>
          <div>{artistsList}</div>
        </body>
      </html>
    );
  }
}

module.exports = Artists;

var React = require("react");

class Artists extends React.Component {
  render() {

    const artists = this.props.artists.map(artist => {
        return <div>
        <h1>{artist.name}, {artist.nationality}</h1>
        <img src={artist.photo_url} style={{width: '100px'}}/>
        </div>;
    });

    return (
      <html>
        <head />
        <body>
          {artists}
        </body>
      </html>
    );
  }
}

module.exports = Artists;
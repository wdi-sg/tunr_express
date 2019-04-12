var React = require("react");

class Artist extends React.Component {
  render() {

        const artist = this.props.ccb.map((artist) =>{
    return <div>
    <p> {artist.name} </p>
    <p> {artist.nationality} </p>
    <img src={artist.photo_url} style={{width: '300px'}}/>
    </div>
});

    return (
      <html>
        <head />
        <body>
          <p> HELLO </p>
          {artist}
        </body>
      </html>
    );
  }
}

module.exports = Artist;
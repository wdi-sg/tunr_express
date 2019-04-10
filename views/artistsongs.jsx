var React = require("react");

class ArtistSongs extends React.Component {
  render() {

        const songs = this.props.ccb.map((song) =>{
    return <div>
    <p> {song.album} </p>
    <p> {song.title} </p>
    <img src={song.artwork} style={{width: '300px'}}/>
    </div>
});

    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
          <p> HELLO </p>
          {songs}
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;
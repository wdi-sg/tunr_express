var React = require("react");

class DisplayOneSongMod extends React.Component {
  render() {
    
    let song = this.props.song;

    return (
      <div>
        <h4>TITLE: {song.title}</h4>
        <ul>
          <li>ID: {song.id}</li>
          <li>ALBUM: {song.album}</li>
          {/* <li>PREVIEW: <img src={song.preview_link} height="300" width="300"></img></li>
          <li>ARTWORK: <img src={song.artwork} height="300" width="300"></img></li> */}
        </ul>
      </div>
    );
  }
}

module.exports = DisplayOneSongMod;

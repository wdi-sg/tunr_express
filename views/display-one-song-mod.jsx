var React = require("react");

class DisplayOneSongMod extends React.Component {
  render() {
    let song = this.props.song;

    return (
      <div>
        <h4>Title: {song.title}</h4>
        <ul>
          <li>Id: {song.id}</li>
          <li>Album: {song.album}</li>
          <li>
            Preview:
            <br></br>
            <img src={song.preview_link} height="300" width="300"></img>
          </li>
          <li>
            Artwork:
            <br></br>
            <img src={song.artwork} height="300" width="300"></img>
          </li>
        </ul>
        <br></br>
      </div>
    );
  }
}

module.exports = DisplayOneSongMod;

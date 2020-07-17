var React = require("react");

class Artistsongs extends React.Component {
  render() {
    var artistLink = "/artist/"+this.props.name+"/showfeature"
    return (
      <div class='artist-song-feature'>
        <p>{this.props.artist_id}</p>
        <p>{this.props.title}</p>
        <p>{this.props.album}</p>
        <audio src={this.props.preview_link} controls>Preview Link</audio>
        <img src={this.props.artwork}/>
      </div>
    );
  }
}

module.exports = Artistsongs;

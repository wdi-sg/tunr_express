var React = require("react");

class PLAYLIST extends React.Component {
  render() {
    return (
   		<div className = {'mx-2 text-center artistsprofile'}>
   			<a href={`/playlist/${this.props.playlistData.id}`}><img src={this.props.playlistData.playlist_image} /> </a>
   			<p> {this.props.playlistData.title} </p>
      	</div>
    );
  }
}

module.exports = PLAYLIST;
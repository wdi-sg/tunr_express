var React = require("react");

class ARTIST extends React.Component {
  render() {
    return (
   		<div className = {'mx-2 text-center artistsprofile'}>
   			<a href={`/songs/${this.props.songData.id}`}><img src={this.props.songData.artwork} /> </a>
   			<p> {this.props.songData.title} </p>
   			<p> {this.props.songData.album} </p>    
   			<a href={this.props.songData.preview_link}>Preview Link</a><br />
   			{this.props.children}<br />		
      	</div>
    );
  }
}

module.exports = ARTIST;
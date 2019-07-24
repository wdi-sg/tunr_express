var React = require("react");

class ARTIST extends React.Component {
  render() {
    return (
   		<div className = {'mx-2 text-center artistsprofile'}>
   			<a href={`/artists/${this.props.artistData.id}`}><img src={this.props.artistData.photo_url} /> </a>
   			<p> {this.props.artistData.name} </p>
   			<p> {this.props.artistData.nationality} </p>    		
      	</div>
    );
  }
}

module.exports = ARTIST;
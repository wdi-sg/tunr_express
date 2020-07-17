var React = require('react');
class ArtistInfo extends React.Component {
  render() {
    
    return (
      <div className = "card">
      	<div className = "wrapper">
        	<a href ={"/artists/" + this.props.id} ><img src={this.props.display.photo_url}/></a>
        </div>
        <h3>{this.props.display.name}</h3>

      </div>   

    )
  };
}
  
module.exports = ArtistInfo;
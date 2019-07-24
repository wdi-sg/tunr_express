var React = require("react");

class Artist extends React.Component {
  render() {
    var artistLink = "/artist/"+this.props.id+"/songs"
    return (
      <div class='artist-photo'>
        <a href={artistLink}><img src={this.props.photo_url}/></a><br/>
        Name:{this.props.name}<br/>
        Artist ID:{this.props.id}
      </div>
    );
  }
}

module.exports = Artist;

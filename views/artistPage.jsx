var React = require('react');


class ArtistPage extends React.Component {
  render() {
    var url = '/artists';
    return (
      <div>
        <a href={url}> Back to artists</a>
        <h1>{this.props.artist.name}</h1>
        <p>{this.props.artist.nationality}</p>
        <img src={this.props.artist.photo_url}/><br/>
      </div>
    );
  }
}

module.exports = ArtistPage;

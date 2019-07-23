var React = require('react');


class ArtistPage extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.artist.name}</h1>
        <p>{this.props.artist.nationality}</p>
        <img src={this.props.artist.photo_url}/><br/>
      </div>
    );
  }
}

module.exports = ArtistPage;

var React = require("react");
var Default = require("./default")

class ArtistIndex extends React.Component {
  render() {

    const artistList = this.props.obj.map( (artist) => {
      return (
        <div>
          <h3>{artist.name}</h3>
          <p>{artist.id}</p>
          <p>{artist.nationality}</p>
          <img src={artist.photo_url}></img>
        </div>
      )
    });

    return (
      <Default>
        <h2>Artist Index</h2>
        {artistList}
      </Default>
    );
  }
}

module.exports = ArtistIndex;

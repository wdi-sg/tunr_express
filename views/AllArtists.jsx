const React = require("react");
const Artist = require("./Artist");

class AllArtists extends React.Component {
  render() {
    return (
      <div>
        <h1>All Artists</h1>
        <h2><a href="/artists/new">add a new artist</a></h2>
        {this.props.artists.map(artist => (
          <Artist id={artist.id} name={artist.name} nationality={artist.nationality} photo_url={artist.photo_url}/>
        ))}
      </div>
    );
  }
}

module.exports = AllArtists;

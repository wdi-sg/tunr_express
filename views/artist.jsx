const React = require("react");

class Artist extends React.Component {
  render() {
    const {artist} = this.props;
    console.log(artist)
    return (
      <div>
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <h1>{artist.name}</h1>
            <h4>Nationality: {artist.nationality}</h4>
            <img width={400} src={artist.photo_url} alt={`${artist.name} image`} />
            <a href={`/artists/${artist.id}/edit`}><button>Edit</button></a>
            <a href={`/artists/${artist.id}/songs`}><button>View song list</button></a>
          </div>
      </div>
    );
  }
}

module.exports = Artist;
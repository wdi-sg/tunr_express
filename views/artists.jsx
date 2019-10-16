const React = require("react");

class Artists extends React.Component {
  render() {
    const {artists} = this.props;
    return (
      <div>
        {artists.map((artist, i) => (
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} key={i}>
            <h1>{artist.name}</h1>
            <h4>Nationality: {artist.nationality}</h4>
            <img width={400} src={artist.photo_url} alt={`${artist.name} image`} />
            <a href={`/artists/${artist.id}`}><button>More details</button></a>
          </div>
        ))}
      </div>
    );
  }
}

module.exports = Artists;
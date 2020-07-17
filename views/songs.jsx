const React = require("react");

class Artists extends React.Component {
  render() {
    const {songs, id} = this.props;
    return (
      <div>
        <a href={`/artists/${id}/songs/new`}><button>Add song</button></a>
        {songs.map((song, i) => (
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} key={i}>
            <h1>{song.title}</h1>
            <h4>Album: {song.album}</h4>
            <img src={song.artwork} alt={`${song.title} image`} />
            <audio controls>
                <source src={song.preview_link}></source>
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

module.exports = Artists;
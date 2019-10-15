const React = require("react");

class Artists extends React.Component {
  render() {
    const {songs} = this.props;
    return (
      <div>
        {songs.map((song, i) => (
          <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}} key={i}>
            <h1>{song.title}</h1>
            <h4>Album: {song.album}</h4>
            <img src={song.artwork} alt={`${song.title} image`} />
            <audio controls>
                <source src={song.preview_link}></source>
            </audio>
            <a href={`/artists/${song.artist_id}/songs/${song.id}`}><button>More details</button></a>
          </div>
        ))}
      </div>
    );
  }
}

module.exports = Artists;

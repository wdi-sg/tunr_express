const React = require("react");

class PlaylistSongs extends React.Component {
  render() {
    const {playlist, id} = this.props;
    return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <h1>{playlist[0].name}</h1>
        <a href={`/playlist/${id}/newsong`}>
          <button>Add song</button>
        </a>
        {playlist.map((song, i) => (
          <div key={i}>
            <h4>
              <span>{song.title}</span>
              <span> - </span>
              <span>{song.album}</span>
            </h4>
            <audio controls>
              <source src={song.preview_link}></source>
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

module.exports = PlaylistSongs;

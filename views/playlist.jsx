const React = require("react");

class Playlist extends React.Component {
  render() {
    const {playlist} = this.props;
    return (
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <h1>List of playlists</h1>
        <a href="/playlist/new"><button>Add playlist</button></a>
        {playlist.map((data, i) => (
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}} key={i}>
            <h3>{data.name}</h3>
            <a href={`/playlist/${data.id}`}><button>View songs</button></a>
          </div>
        ))}
      </div>
    );
  }
}

module.exports = Playlist;
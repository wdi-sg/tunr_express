var React = require("react");

class NewPlaylistSong extends React.Component {
  render() {
    const {songs, id} = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {songs.map((song, i) => (
          <div key={i}>
            <form action={`/playlist/${id}`} method="post">
              <h4 style={{display: "inline-block"}}>{song.title} - {song.album} </h4>
              <input
                type="text"
                name="song_id"
                defaultValue={song.id}
                style={{display: "none"}}
              />
              <input type="submit" value="Add to playlist" />
            </form>
          </div>
        ))}
      </div>
    );
  }
}

module.exports = NewPlaylistSong;

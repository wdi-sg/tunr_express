var React = require("react");

class NewFavorite extends React.Component {
  render() {
    const {songs} = this.props;
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
            <form action={`/favorites`} method="post">
              <h4 style={{display: "inline-block"}}>{song.title} - {song.album} </h4>
              <input
                type="text"
                name="song_id"
                defaultValue={song.id}
                style={{display: "none"}}
              />
              <input type="submit" value="Add to favorites" />
            </form>
          </div>
        ))}
      </div>
    );
  }
}

module.exports = NewFavorite;

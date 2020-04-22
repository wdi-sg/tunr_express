const React = require("react");
const Layout = require("./layout");

class newPlaylistSong extends React.Component {
  render() {
    let actionPath = "/playlists/" + this.props.playlistID;
    const songs = this.props.songs;
    const songElement = songs.map(song => {
      return <option value={song.id}>{song.title}</option>;
    });

    return (
      <Layout username={this.props.username}>
        <div className="container d-flex justify-content-center">
          <form action={actionPath} method="post" className="form-inline">
            <select className="form-control mr-3" name="song_id">{songElement}</select>
            <input className="btn btn-primary" type="submit" />
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = newPlaylistSong;

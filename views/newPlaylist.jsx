const React = require("react");
const Layout = require("./layout");

class newPlaylist extends React.Component {
  render() {
    // const songs = this.props.songs;
    // const songOptions = songs.map(song => {
    //   return <option value={song.title}>{song.title}</option>;
    // });

    return (
      <Layout username={this.props.username}>
        <div className="container d-flex justify-content-center new-playlist">
          <form action="/playlists" method="POST" class="form-inline">
            <div class="form-group mx-sm-3 mb-2">
              <input
                type="text"
                class="form-control"
                name="playlist_name"
                placeholder="Playlist Name"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary mb-2">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = newPlaylist;

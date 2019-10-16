var React = require("react");
var Layout = require('./defaultlayout.jsx');

class AddToPlaylist extends React.Component {
  render() {
      const song = this.props.result[0];
    return (
      <Layout>
          <div className="col-12">
            <h2 class="m-3">Add song to playlist</h2>
            <form class="m-3" method="POST" action={"/playlists/"+song.id}>
                Song title: <input type="text" name="name" value={song.title} readOnly required/><br/>
                Song ID: <input type="integer" name="id" value={song.id} readOnly required/><br/>
                Playlist ID: <input type="integer" name="playlist_id" placeholder="playlist number" required/><br/>
                <input type="submit" value="Submit"/>
            </form>
          </div>
      </Layout>
    );
  }
}

module.exports = AddToPlaylist;

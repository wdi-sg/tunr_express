var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class AddToPlaylist extends React.Component {
  render() {

    const songs = this.props.songs
    const playlist = this.props.playlist

    const songsList = songs.map(song=> {
      return (
        <option key={song.id} value={song.id}>{song.title}</option>
      )
    })

    return (
      <html>
        <Head/>
        <body>
        <Nav/>
          <h3>Adding to Playlist '{playlist.name}'</h3>
          <form action={`/playlists/${playlist.id}`} method="post">
          <select name="songId">
            <option>Add Songs...</option>
            {songsList}
          </select>

            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
          <Footer/>
        </body>
      </html>
    );
  }
}

module.exports = AddToPlaylist;

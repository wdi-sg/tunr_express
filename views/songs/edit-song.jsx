var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class NewSong extends React.Component {
  render() {
    const artists = this.props.artistsData;
    const song = this.props.songData
  
    const artistOptions = artists.map((artist) => {
      if (song.artist_id===artist.id) {
        return
      } else {
        return <option key={artist.id} value={artist.id}>{artist.name}</option>;
      }
    });

    return (
      <html>
        <Head/>
        <body>
        <Nav/>

          <h3>Creating A New Song</h3>
          <form action={`/songs/${song.id}?_method=put`} method="post">
            <input value={song.title} name="title" placeholder="Song Title" />
            <input value={song.album} name="album" placeholder="Album" />
            <input
              value={song.preview_link}
              name="preview_link"
              placeholder="Preview Link"
            />
            <input value={song.artwork} name="artwork" placeholder="Artwork" />
            <select name="artistId">
              <option value={song.artist_id}>{song.artist_name}</option>
              {artistOptions}
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

module.exports = NewSong;

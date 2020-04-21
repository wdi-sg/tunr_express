var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class NewSongByArtist extends React.Component {
  render() {

    const artist = this.props.artistData

    return (
      <html>
        <Head/>
        <body>
        <Nav/>

          <h3>Creating A New Song</h3>
          <form action="/songs" method="post">
            <input name="title" placeholder="Song Title" />
            <input name="album" placeholder="Album" />
            <input name="preview_link" placeholder="Preview Link" />
            <input name="artwork" placeholder="Artwork" />
            <select name="artistId">
              <option value={artist.id}>{artist.name}</option>
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

module.exports = NewSongByArtist;

var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class NewSong extends React.Component {
  render() {

    const artists = this.props.artistData

    const artistOptions = artists.map( artist => {
      return <option value={artist.id}>{artist.name}</option>
    })

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
              <option>Select An Artist...</option>
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

var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class Song extends React.Component {
  render() {

    const song = this.props.songData;

    return (
      <html>
        <Head/>
        <body>
        <Nav/>
          <div className="artist">
            <h1>
              {song.id}) {song.title}
            </h1>
            <h2>
              Artist:{" "}
              <a href={`/artists/${song.artist_id}`}>{song.artist_name}</a>
            </h2>
            <h3>Album: {song.album}</h3>
            <p>
              <img src={song.artwork} />
            </p>
            <p>
              <a href={song.preview_link}>Preview Song</a>
            </p>

            <a href={`/songs/${song.id}/edit`}>
              <button className="btn btn-warning">Edit song</button>
            </a>
            <form method="post" action={`/songs/${song.id}?_method=delete`}>
              <button type="submit" className="btn btn-danger">
                Delete song
              </button>
            </form>

            <a href="/songs">
              <button className="btn btn-primary">Back To Songs</button>
            </a>
          </div>
          <Footer/>
        </body>
      </html>
    );
  }
}

module.exports = Song;

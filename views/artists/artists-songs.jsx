var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class ArtistSongs extends React.Component {
  render() {
    const info = this.props.songs;
    const songsList = info.map(song => {
      return (
        <li key={song.id}>
          <a href={`/songs/${song.id}`}>{song.title}</a>
        </li>
      );
    });

    return (
      <html>
        <Head/>
        <body>
        <Nav/>
          <a href={`/artists/${info[0].artist_id}/songs/new`}>
            <button className="btn btn-success">Add A Song for This Artist</button>
          </a>
          <h1>List of Songs by {info[0].artist_name}</h1>
          <ul>{songsList}</ul>
          <Footer/>
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;

var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class AllSongs extends React.Component {
  render() {
    const songsArr = this.props.songs;
    const songLinks = songsArr.map((song) => {
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

          <h1>All Songs</h1>
          <ol>{songLinks}</ol>
          <Footer/>
        </body>
      </html>
    );
  }
}

module.exports = AllSongs;

var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class AllPlaylists extends React.Component {
  render() {

    const playlistArr = this.props.playlists;
    const playlistLinks = playlistArr.map((playlist) => {
      return (
        <li key={playlist.id}>
          <a href={`/playlists/${playlist.id}`}>{playlist.name}</a>
        </li>
      );
    });

    return (
      <html>
        <Head/>
        <Nav/>
        <body>

          <h1>All Playlists</h1>
          <ul>{playlistLinks}</ul>
          <Footer/>
        </body>
      </html>
    );
  }
}

module.exports = AllPlaylists;

var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";
class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <Head/>
        <body>
        <Nav/>
          <h3>Create A New Playlist</h3>
          <form action="/playlists" method="post">
            <input name="name" placeholder="Name of Playlist" />
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

module.exports = NewPlaylist;

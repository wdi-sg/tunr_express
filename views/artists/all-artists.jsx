var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";
class AllArtists extends React.Component {
  render() {

    const artistArr = this.props.artists;
    const artistLinks = artistArr.map((artist) => {
      return (
        <li key={artist.id}><a href={`/artists/${artist.id}`}>{artist.name}</a></li>
      );
    });

    return (
      <html>
        <Head/>
        <body>
        <Nav/>

          <h1>All Artists</h1>
          <ul>{artistLinks}</ul>
          <Footer/>
        </body>
      </html>
    );
  }
}

module.exports = AllArtists;

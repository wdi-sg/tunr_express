var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class Artist extends React.Component {
  render() {

    const artist = this.props.artistData;

    return (
      <html>
        <Head/>
        <body>
        <Nav/>
          <div className="artist">
            <h1>
              {artist.id}) {artist.name}
            </h1>
            <img src={artist.photo_url}></img>
            <p>Nationality: {artist.nationality}</p>

            <p><a href={`/artists/${artist.id}/songs`}>View All Songs</a></p>

            <a href={`/artists/${artist.id}/edit`}>
              <button className="btn btn-warning">Edit Artist</button>
            </a>
            <form method="post" action={`/artists/${artist.id}?_method=delete`}>
              <button type="submit" className="btn btn-danger">
                Delete Artist
              </button>
            </form>

            <a href="/artists">
              <button className="btn btn-primary">Back To Artists</button>
            </a>
          </div>
          <Footer/>
        </body>
      </html>
    );
  }
}

module.exports = Artist;

var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class New extends React.Component {
  render() {

    const artist = this.props.artistData

    return (
      <html>
        <Head/>
        <body>
        <Nav/>
          <a href="/">
            <button className="btn btn-primary">Back To Home</button>
          </a>
          <h1>Editing Artist: {artist.name}</h1>
          <form action={`/artists/${artist.id}?_method=put`} method="POST">
            <input value={artist.name} name="name" placeholder="Artist Name" />
            <input
              value={artist.photo_url}
              name="photo_url"
              placeholder="Image URL"
            />
            <input
              value={artist.nationality}
              name="nationality"
              placeholder="Nationality"
            />
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

module.exports = New;

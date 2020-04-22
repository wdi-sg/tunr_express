var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class AddFavourite extends React.Component {
  render() {
        if (this.props.isLoggedIn === "false") {
          return (
            <html>
              <Head />
              <Nav />
              <body>
                <div className="container-fluid">
                  <div className="error">
                    <p>Error: {this.props.errorMsg}</p>
                  </div>
                </div>

                <Footer />
              </body>
            </html>
          );
        }

    const songs = this.props.songs;
    const songsList = songs.map((song) => {
      return (
        <option key={song.id} value={song.id}>
          {song.title}
        </option>
      );
    });

    return (
      <html>
        <Head />
        <body>
          <Nav />
          <div className="container-fluid">
          <h3>Add A Favourite</h3>
          <form action="/favourites" method="post">
            <select name="songId">
              {songsList}
            </select>
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
          </div>
          <Footer />
        </body>
      </html>
    );
  }
}

module.exports = AddFavourite;

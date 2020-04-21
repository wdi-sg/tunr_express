var React = require("react");
import Nav from "../components/nav";
import Head from "../components/header";
import Footer from "../components/footer";

class AllFavourites extends React.Component {
  render() {

    if (this.props.isLoggedIn==='false') {
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
    } else {
      const faves = this.props.faves;
      const favesLinks = faves.map( fave => {
        return (
          <li key={fave.id}>
            <a href={`/songs/${fave.id}`}>{fave.title}</a>
          </li>
        );
      });

      return (
        <html>
          <Head />
          <Nav />
          <body>
            <div className="container-fluid">
              <h1>Your Favourites</h1>
              <ul>{favesLinks}</ul>
            </div>
            <Footer />
          </body>
        </html>
      );
    }
  }
}

module.exports = AllFavourites;

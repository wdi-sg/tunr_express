var React = require("react");
import Nav from "./components/nav";
import Head from "./components/header";
import Footer from "./components/footer"

class Home extends React.Component {
  render() {

    let badge;
    if (this.props.badge!==undefined) {
      badge = (
        <button className="btn btn-primary">
          Your Badge: {this.props.badge} Viewer
        </button>
      );
    }

    return (
      <html>
        <Head />
        <body>
          <Nav />

          <div className="container-fluid">
            <div className="jumbotron">
              <h1>Welcome to Tunr DB!</h1>
              <p>Use the navigation above to view all our songs and artists.</p>
            </div>
          </div>

          <div className="viewcount">
            <button className="btn btn-light">
              Viewcount: {this.props.visits}
            </button>
            <br/>{badge}
          </div>
          <Footer />
        </body>
      </html>
    );
  }
}

module.exports = Home;

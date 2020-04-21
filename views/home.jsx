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
      <Head/>
        <body>
        <Nav/>

          <button className="btn btn-light">
            Viewcount: {this.props.visits}
          </button>
          {badge}
        <Footer/>
        </body>
      </html>
    );
  }
}

module.exports = Home;

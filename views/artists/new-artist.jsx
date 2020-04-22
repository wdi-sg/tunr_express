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

          <h3>Creating A New Artist</h3>
          <form action="/artists" method="post">
            <input name="name" placeholder="Artist Name" />
            <input name="photo_url" placeholder="Image URL" />
            <input name="nationality" placeholder="Nationality" />
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

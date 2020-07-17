var React = require("react");
var Layout = require('./layout')

class Artist extends React.Component {
  render() {

    const {
        name,
        photo_url,
        nationality,
    } = this.props.artist

    return (
      <Layout>
          <h1>DISPLAYING SINGLE ARTIST</h1>

          <img src = {photo_url}></img>
          <h2>Name: {name}</h2>
          <h2>Nationality: {nationality}</h2>
    </Layout>
    );
  }
}

module.exports = Artist;
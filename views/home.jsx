var React = require("react");

class Home extends React.Component {
  render() {

    const artistListElements = this.props.artistsArray.map(artist => {
        let artistLink = "/artists/" + artist.id;
        return <li><a href = {artistLink}>{artist.name}</a></li>
    })
    return (
      <html>
        <head />
        <body>
          <h1>List of Artists</h1>
          <ol>{artistListElements}</ol>
        </body>
      </html>
    );
  }
}

module.exports = Home;
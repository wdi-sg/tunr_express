var React = require("react");

class Home extends React.Component {
  render() {
            let artistData = this.props.artists.map((artist) => {
            return <td><tb>{artist.id}</tb>
            <tb><a href={"/artists/"+artist.id}>{artist.name}</a></tb>
            <tb><img src={artist.photo_url} width="100px" height="100px"/></tb>
            <tb>{artist.nationality}</tb></td>

        });
    return (
      <html>
        <head />
        <body>
          <h1>Welcome World!</h1>
          {artistData}
        </body>
      </html>
    );
  }
}

module.exports = Home;
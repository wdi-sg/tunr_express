var React = require("react");

class Home extends React.Component {
  render() {
    const artistsNameList = this.props.rows.map((artist) => {
        return <li key={artist.id}><a href={'/artists/'+artist.id}>{artist.name}</a></li>
    })

    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
          <ul>{artistsNameList}</ul>
          <br/>
          <a href="/artists/new">Add New Artist</a>
        </body>
      </html>
    );
  }
}
module.exports = Home;

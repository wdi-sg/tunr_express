var React = require("react");

class Artists extends React.Component {
  render() {
    console.log('artists.jsx')
    const artistsNameList = this.props.rows.map((artist) => {
        return <li key={artist.id}><a href={'/artists/'+artist.id}>{artist.name}</a></li>
    })

    return (
      <html>
        <head />
        <body>
            <a href="/">Back to Main</a>
          <h1>Artists</h1>
          <ul>{artistsNameList}</ul>
          <br/>
          <a href="/artists/new">Add New Artist</a>
          <br/>
        </body>
      </html>
    );
  }
}
module.exports = Artists;
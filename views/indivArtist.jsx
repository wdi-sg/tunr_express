var React = require("react");

class Artist extends React.Component {
  render() {
        let artist = this.props.rows[0]
        let editFormURL="/artists/"+artist.id+"/edit"

    return (
      <html>
        <head />
        <body>
          <h1>{artist.name}</h1>
          <a href={editFormURL}><button>Edit this artist!</button></a><br/>
          <img src={artist.photo_url}/><br/>
          <p>Nationality: {artist.nationality}</p>

        </body>
      </html>
    );
  }
}

module.exports = Artist;
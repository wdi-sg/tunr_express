var React = require("react");

class Artist extends React.Component {
  render() {
        let artist = this.props.rows[0]
        let editFormURL="/artists/"+artist.id+"/edit"
        let songsURL = "/artists/"+artist.id+"/songs"
        let newArtistSongURL = "/artists/"+ artist.id+"/songs/new"

    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet"/>
        </head>
        <body>
          <h1>{artist.name}</h1>
          <a href={editFormURL}><button>Edit this artist</button></a>
          <a href={newArtistSongURL}><button>Add song for this artist</button></a><br/><br/>
          <img src={artist.photo_url}/><br/>
          <p>Nationality: {artist.nationality}</p>
          <a href={songsURL}>See this artist's songs</a><br/><br/>
          <a href="/artists/"><button>Back to artists</button></a>

        </body>
      </html>
    );
  }
}

module.exports = Artist;
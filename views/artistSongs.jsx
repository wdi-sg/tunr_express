var React = require("react");

class ArtistSongs extends React.Component {
  render() {
        let songs = this.props.rows
        let songsHTML = songs.map((item)=>{
            let songURL = "/songs/" + item.id
            return <li><a href={songURL}>{item.title}</a></li>
        })
        let artistURL = "/artists/" + songs[0].artist_id
        let newSongURL = "/artists/" + songs[0].artist_id + "/songs/new"

    return (
      <html>
        <head>
            <link rel="stylesheet" type="text/css" href="/css/style.css" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200&display=swap" rel="stylesheet"/>
        </head>
        <body>
          <h1>Songs by <a href={artistURL}>{songs[0].artist_name}</a></h1>
          <a href="/songs/"><button>Back to songs</button></a><br/><br/>
          <a href="/artists/"><button>Back to artists</button></a>
          <p> <a href={newSongURL}>Add a new song for this artist.</a> </p>
          <ul>
          {songsHTML}
          </ul>

        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;
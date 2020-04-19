var React = require("react");

class Show extends React.Component {
  render() {

    console.log(this.props.songs.id);
         const songsByArtist = this.props.songs.map( song => {
            let songId = parseInt(song.artist_id);

        return <li>{song.title}</li>
    })


let artistInfo = this.props.artists.map(artist => {
    return (
        <div>
        <h1>Artist Name: {artist.name}</h1>
        <p>Artist Nationality: {artist.nationality}</p>
        <form method="POST" action="/artist/new">
        <p>
        Add Song <input type="text" name="title" />
        </p>
        <p>
        Add Album Name <input type="text" name="album" />
                        <input type="hidden" name="songId" />
        </p>
        <p>
            <button type="submit">Add Song Details</button>
        </p>
        </form>
        <p>Songs: </p>
        <ol>
        {songsByArtist}
        </ol>
        </div>
        )
    })

    return (
      <html>
        <head />
        <body>
        {artistInfo}
        </body>
      </html>
    );
  }

}



module.exports = Show;
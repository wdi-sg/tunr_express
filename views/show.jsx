var React = require("react");

class Show extends React.Component {
  render() {

    console.log(this.props.songs.id);
         const songsByArtist = this.props.songs.map( song => {
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
                        <input type="hidden" value={artist.id} name="songId" />
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
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </head>
        <body>
        {artistInfo}
        </body>
      </html>
    );
  }

}



module.exports = Show;
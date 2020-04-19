var React = require("react");

class Show extends React.Component {
  render() {

    console.log(this.props.artists);
    const songsByArtist = this.props.songs.map( song => {
        return <li>{song.title}</li>
    })


let artistInfo = this.props.artists.map(artist => {
    return (
        <div>
        <h1>Artist Name: {artist.name}</h1>
        <p>Artist Nationality: {artist.nationality}</p>
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
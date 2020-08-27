var React = require("react");

class ArtistSongs extends React.Component {
  render() {
        let songs = this.props.rows
        let songsHTML = songs.map((item)=>{
            return <li>{item.title}</li>
        })

    return (
      <html>
        <head />
        <body>
          <h1>Songs by {songs[0].artist_name}</h1>
          <ul>
          {songsHTML}
          </ul>

        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;
var React = require("react");

class ArtistSongs extends React.Component {
  render() {
        let songs = this.props.rows
        let songsHTML = songs.map((item)=>{
            let songURL = "/songs/" + item.id
            return <li><a href={songURL}>{item.title}</a></li>
        })
        let artistURL = "/artists/" + songs[0].artist_id

    return (
      <html>
        <head />
        <body>
          <h1>Songs by <a href={artistURL}>{songs[0].artist_name}</a></h1>
          <ul>
          {songsHTML}
          </ul>

        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;
const React = require('react');

class Show extends React.Component {
  render(){
    const list = this.props.rows.map(song  => {
     return (
       // title, album, preview_link, artwork, artist_id
       <div>
        <p>Song Id: {song.id} </p>
        <p>Title: {song.title}</p>
        <p>Album: {song.album}</p>
        <p>Preview Link: {song.preview_link}</p>
        <p>Artwork: {song.artwork}</p>
        <p>Artist Id: {song.artist_id}</p><br/><br/>
       </div>
     );
    })
    return(
      <html>
        <body>
          <h1>Show</h1>
          <h2>Songs by Artist: {this.props.rows[0].name}</h2>
          {list}
        </body>
      </html>
    )
  }
}

module.exports = Show
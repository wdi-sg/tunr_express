const React = require('react');

class Show extends React.Component {
  render(){
    const list = this.props.rows.map(song  => {
     return (
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
          <h2>Playlist Id: {this.props.id}</h2>
          <h2>Playlist Name: {this.props.rows[0].name}</h2><br/><br/><br/><br/>
          {list}<br/><br/>
        </body>
      </html>
    )
  }
}

module.exports = Show
const React = require('react');

class Create extends React.Component {
  render(){
    const list = this.props.rows.map(song  => {
     return (
       <div>
         <p>Song Id: {song.id} </p>
          <p>Title: {song.title}</p>
          <p>Album: {song.album}</p>
          <p>Preview Link: {song.preview_link}</p>
          <p>Artwork: {song.artwork}</p>
          <p>Artist Id: {song.artist_id}</p>
       </div>
     );
    })
    return(
      <html>
        <body>
          <h1>Song Created</h1>
          {list}
        </body>
      </html>
    )
  }
}

module.exports = Create;
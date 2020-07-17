const React = require('react');

class New extends React.Component {
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
          <form action={`/favorites`} method="POST">
            <input type="hidden" name="id" defaultValue={song.id}/>
            <input type="hidden" name="title" defaultValue={song.title}/>
            <input type="hidden" name="album" defaultValue={song.album}/>
            <input type="hidden" name="preview_link" defaultValue={song.preview_link}/>
            <input type="hidden" name="artwork" defaultValue={song.artwork}/>
            <input type="hidden" name="artist_id" defaultValue={song.artist_id}/>
            <input type="submit" value="Add song to favorites"/><br/><br/><br/><br/>
          </form>
        </div>
      );
    })
    return(
      <html>
        <body>
          <h1>Add New Song to Favorites</h1>
          {list}
        </body>
      </html>
    )
  }
}

module.exports = New;
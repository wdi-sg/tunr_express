var React = require("react");

class NewSong extends React.Component {
  render() {

    let eachArtist = this.props.artists.map(artist => {
      return (<option value={artist.id}>{artist.name}</option>)
    })

    return (
      <html>
        <head/>
        <body>
          <h3>Add New Songs</h3>

          <form action="/song" method="POST">
            <h4>Artist</h4>

            <select name="artist">
              {eachArtist}
            </select>

            <h4>Title</h4>
            <input type="text" name="title" placeholder="e.g. Boom boom bang"/>

            <h4>Album</h4>
            <input type="text" name="album" placeholder="e.g. Bring Her Back"/>
                            
            <h4>Preview Link</h4> 
            <input type="text" name="preview" placeholder="e.g. https://www.youtube.com/i23423fdss"/>

            <h4>Artwork Link</h4> 
            <input type="text" name="artwork" placeholder="e.g. https://www.google.com/img"/>

            <br/>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewSong;

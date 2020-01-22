var React = require("react");

class NewSongForArtist extends React.Component {
  render() {
    const id = this.props.artist.id
    const actionURL = "/artists/"+id+"/songs/"

    const allArtist = this.props.allArtists.map((item)=> {
        return <option value={item.id}>{item.name}</option>
    })
    
    return (
      <html>
        <head />
        <body>
            <h1>Add New Song!</h1>
        <form action={actionURL} method="POST">
            <input type="text" name="title" placeholder="title"/>
            <input type="text" name="album" placeholder="album"/>
            <input type="text" name="preview_link" placeholder="preview_link"/>
            <input type="text" name="artwork" placeholder="artwork"/>
            <select name="artist_id" id="">
                {allArtist}
            </select>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewSongForArtist;

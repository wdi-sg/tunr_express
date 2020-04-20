var React = require("react");

class NewArtistSong extends React.Component {
  render() {
    const artist = this.props.artistInfo.name;
    const addSongLink = '/artists/' + this.props.artistInfo.id + "/songs"
    const viewCount = this.props.visits;
    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <h1 className="container">Add a New Song for {artist}</h1>
            <form method="POST" action={addSongLink} className = "container">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title"></input>
              </div>
              <div className="form-group">
                <label htmlFor="album">Album</label>
                <input type="text" className="form-control" id="album" name="album"></input>
              </div>
              <div className="form-group">
                <label htmlFor="preview_link">Preview Link</label>
                <input type="text" className="form-control" id="preview_link" name="preview_link"></input>
              </div>
              <div className="form-group">
                <label htmlFor="artwork">Artwork</label>
                <input type="text" className="form-control" id="artwork" name="artwork"></input>
              </div>
              <div className="form-group">
                <label htmlFor="artist_id"></label>
                <input type="hidden" className="form-control" id="artist_id" name="artist_id" value = {this.props.id}></input>
              </div>
                <button type="submit" value="Submit" className="btn btn-primary">Add Song</button>
            </form>
          </div>
          <h1>View Count: {viewCount}</h1>
        </body>
      </html>
    );
  }
}

module.exports = NewArtistSong;
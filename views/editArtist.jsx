var React = require("react");

class EditArtist extends React.Component {
  render() {
    console.log("In react",this.props.artist.name)
    let formURLEdit = "/artists/"+this.props.artist.id+"/?_method=put"
    let formURLDelete = "/artists/"+this.props.artist.id+"/?_method=delete"
    return (
      <html>
        <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"></link>
        </head>
        <body>
          <form action={formURLEdit} method="POST">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" name="name" value={this.props.artist.name}></input>
              </div>
              <div class="form-group">
                <label>Photo URL</label>
                <input type="text" class="form-control" name="photo_url" value={this.props.artist.photo_url}></input>
              </div>
              <div class="form-group">
                <label>Nationality</label>
                <input type="text" class="form-control" name="nationality" value={this.props.artist.nationality}></input>
              </div>
                <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          <form action={formURLDelete} method="POST">
            <button type="submit" class="btn btn-primary">Delete Artists</button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = EditArtist;
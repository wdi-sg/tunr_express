var React = require("react");

class Edit extends React.Component {
  render() {
    const id = this.props.artistInfo.id;
    const name = this.props.artistInfo.name;
    const photo_url = this.props.artistInfo.photo_url;
    const nationality = this.props.artistInfo.nationality;
    const putLink = "/artists/" + id + "?_method=put";
    const deleteLink = "/artists/" + id + "?_method=delete";

    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <h2>{name}</h2>
            <br></br>
          </div>
          <div>
              <h1>Delete Entire Entry</h1>
                <form method="POST" action={deleteLink} className = "container">
                    <button type="submit" className="btn btn-primary">Delete Artist</button>
                </form>
          </div>
          <div>
            <h1>Edit Artist Details</h1>
            <form method="POST" action={putLink} className = "container">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" defaultValue={name}></input>
              </div>
              <div className="form-group">
                <label htmlFor="photo_url">Photo URL</label>
                <input type="text" className="form-control" id="photo_url" name="photo_url" defaultValue={photo_url}></input>
              </div>
              <div className="form-group">
                <label htmlFor="nationality">Nationality</label>
                <input type="text" className="form-control" id="nationality" name="nationality" defaultValue={nationality}></input>
              </div>
                <button type="submit" value="Submit" className="btn btn-primary">Edit Artist</button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
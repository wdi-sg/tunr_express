var React = require("react");

class New extends React.Component {
  render() {
    const viewCount = this.props.visits;
    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <h1>Add a New Artist</h1>
            <form method="POST" action="/artists" className = "container">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name"></input>
              </div>
              <div className="form-group">
                <label htmlFor="photo_url">Photo URL</label>
                <input type="text" className="form-control" id="photo_url" name="photo_url"></input>
              </div>
              <div className="form-group">
                <label htmlFor="nationality">Nationality</label>
                <input type="text" className="form-control" id="nationality" name="nationality"></input>
              </div>
                <button type="submit" value="Submit" className="btn btn-primary">Add Artist</button>
            </form>
          </div>
             <h1>View Count: {viewCount}</h1>
        </body>
      </html>
    );
  }
}

module.exports = New;
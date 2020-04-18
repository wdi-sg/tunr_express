var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <h1 className = "container">Add a New Playlist</h1>
            <form method="POST" action="/playlist" className = "container">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name"></input>
              </div>
              <button type="submit" value="Submit" className="btn btn-primary">Add</button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;
var React = require("react");

class AddFav extends React.Component {
  render() {
    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <div className="container"><h1>Add Song</h1></div>
            <form method="POST" action="/favorites" className = "container">
              <div className="form-group">
                <label htmlFor="songid">Song ID</label>
                <input type="text" className="form-control" id="songid" name="songid"></input>
              </div>
                <button type="submit" value="Submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = AddFav;
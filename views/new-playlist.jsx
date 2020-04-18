var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
        <head>
        <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <div className="container">
            <div className="row">
              <div className="col mt-5">
                <h3><u>Add New Playlist</u></h3>
                <br></br>
                <form method="POST" action="/playlist/new">
                  <input type="text" name="name" placeholder="Name" className="form-control" />
                  <br></br>
                  <br></br>
                  <input className = "btn btn-primary" type="submit" value="Submit" />
                  <br></br>
                </form>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;

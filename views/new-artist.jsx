var React = require("react");

class NewArtist extends React.Component {
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
                <h3>Add New Artist</h3>
                <br></br>
                <form method="POST" action="/artists/new">
                  <input type="text" name="name" placeholder="Name" />
                  <br></br>
                  <br></br>
                  <input
                    type="text"
                    name="photo_url"
                    placeholder="Photo URL Link"
                  />
                  <br></br>
                  <br></br>
                  <input
                    type="text"
                    name="nationality"
                    placeholder="Nationality"
                  />
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

module.exports = NewArtist;

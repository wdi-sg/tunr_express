var React = require("react");

class EditArtist extends React.Component {
  render() {
    let artist = this.props;
    let link = "/artists/" + artist.id + "/edit";
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
                <h3><u>Edit Artist</u></h3>
                <br></br>
                <form method="POST" action={link}>
                  <input type="text" name="name" placeholder="Name" defaultValue={artist.name}/>
                  <br></br>
                  <br></br>
                  <input
                    type="text"
                    name="photo_url"
                    placeholder="Photo URL Link"
                    defaultValue={artist.photo_url}
                  />
                  <br></br>
                  <br></br>
                  <input
                    type="text"
                    name="nationality"
                    placeholder="Nationality"
                    defaultValue={artist.nationality}
                  />
                  <br></br>
                  <br></br>
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                  />
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

module.exports = EditArtist;

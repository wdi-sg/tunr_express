var React = require("react");

class DisplayOneArtist extends React.Component {
  render() {

    let artist = this.props;
    let link = "/artists/" + artist.id;

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
                <h2>Artist</h2>
                <br></br>
                <form method="GET" action={link}>
                  <h4>Id:</h4>
                  <p>{artist.id}</p>
                  <h4>Name:</h4>
                  <p>{artist.name}</p>
                  <h4>Nationality:</h4>
                  <p>{artist.nationality}</p>
                  <h4>Photo:</h4>
                  <img src={artist.photo_url} height="300" width="300"></img>
                </form>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = DisplayOneArtist;

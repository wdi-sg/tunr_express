var React = require("react");

class Newartsong extends React.Component {
  render() {
    const artistName = this.props.passObj.name;
    const artistId = this.props.passObj.id;
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="../style.css" />
          <title>Tunr Express</title>
        </head>
        <body>
          <ul className="nav nav-pills navHeight sticky-top" style={{ background: "lightblue", height: "3.5rem" }}>
            <li className="nav-item" style={{ margin: "auto 5px" }}>
              <a className="nav-link" href="/artist/">
                Home
              </a>
            </li>
          </ul>
          <div className="midWidth">
            <h2>{artistName}</h2>
            <h3>Add a song</h3>
            <form action={"/artist/" + artistId + "/songs"} method="post">
              <div className="form-group">
                <label for="songtitle">Song Title</label>
                <input name="title" className="form-control" id="songtitle" placeholder="Enter song title here" />
              </div>
              <div className="form-group">
                <label for="albumtitle">Album Title</label>
                <input name="album" className="form-control" id="albumtitle" placeholder="Enter album title here" />
              </div>
              <div className="form-group">
                <label for="previewlinkurl">Music Preview Link</label>
                <input name="preview" className="form-control" id="previewlinkurl" placeholder="Enter URL of song preview here" />
              </div>
              <div className="form-group">
                <label for="artworkurl">Artwork</label>
                <input name="artwork" className="form-control" id="artworkurl" placeholder="Enter URL of Artwork" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
            crossOrigin="anonymous"
          />
        </body>
      </html >
    );
  }
}

module.exports = Newartsong;

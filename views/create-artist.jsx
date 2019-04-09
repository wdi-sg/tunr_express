let React = require("react");

class CreateArtist extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title>Page Title</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
        </head>
        <body>
          <form action="/artist/create/add" method="post">
            <div className="form-group">
              <label for="recipe-name">Artist Name</label>
              <input
                type="text"
                className="form-control"
                id="recipe-name"
                aria-describedby="recipe-name-help"
                name="name"
                placeholder="Enter Artist Name"
              />
              <small id="recipe-name-help" className="form-text text-muted">
                Enter Artist Name
              </small>
            </div>
            <div className="form-group">
              <label for="instructions">Image URL</label>
              <input
                type="text"
                className="form-control"
                id="instructions"
                aria-describedby="instructions-help"
                name="photo_url"
                placeholder="Enter Image URL"
              />
              <small id="instructions-help" className="form-text text-muted">
                Link an image URL of your artist
              </small>
            </div>
            <div className="form-group">
              <label for="Nationality">Nationality</label>
              <input
                type="text"
                className="form-control"
                id="nationality"
                aria-describedby="nationality-help"
                name="nationality"
                placeholder="What nationality is your artist?"
              />
              <small id="instructions-help" className="form-text text-muted">
                State your Artist's Nationality
              </small>
            </div>
            <button className="btn btn-primary" type="submit">
              Add Artist
            </button>
          </form>
          <script
            src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"
          />
        </body>
      </html>
    );
  }
}
module.exports = CreateArtist;

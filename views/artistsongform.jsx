const React = require('react');
const Head = require('./head');
const Nav = require('./nav');

class ArtistSongForm extends React.Component {
  render() {
    let data = this.props;
    let artistId = data.id;
    let backLink = `/artists/${artistId}`;
    let formAction = `${backLink}/songs/new`;

    return (
      <html>
        <Head />

        <body>
          <div className="container">
            <div className="row my-3">
              <div className="col-8 offset-2">

                <Nav />

                <form action={formAction} method="post">
                  <div className="form-group">

                    <input type="hidden" name="id" value={artistId} />

                    <input className="form-control"
                           name="artist"
                           value={data.name}
                           readOnly/><br />
                    <input className="form-control"
                           name="title"
                           placeholder="Song Title" /><br />
                    <input className="form-control"
                           name="album"
                           placeholder="Album Title" /><br />
                    <input className="form-control"
                           name="preview_link"
                           placeholder="Audio Preview URL" /><br />
                    <input className="form-control"
                           name="artwork"
                           placeholder="Album Cover URL" /><br />

                    <input className="btn btn-outline-info btn-block"
                           type="submit"
                           value="Add Song"/>
                  </div>
                </form>

                <a href={backLink}
                   className="btn btn-info btn-block">
                  Go Back to Artist Page
                </a>

              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongForm;

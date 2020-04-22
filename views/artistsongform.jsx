const React = require('react');
const Template = require('./template');

class ArtistSongForm extends Template {
  constructor(props) {
    super(props);
    this.title = `Add ${props.name} Song`;
  }

  renderContent() {
    let data = this.props;
    let artistId = data.id;
    let backLink = `/artists/${artistId}`;
    let formAction = `${backLink}/songs/new`;

    return (
      <React.Fragment>
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

      </React.Fragment>
    );
  }
}

module.exports = ArtistSongForm;

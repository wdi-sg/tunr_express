const React = require('react');
const Head = require('./head');

class ArtistForm extends React.Component {
  render() {
    let data = this.props;
    let nameHolder = data.name || "Artist Name";
    let photoHolder = data.photo_url || "Artist Photo URL";
    let nationalityHolder = data.nationality ||  "Artist Nationality";
    let buttonText = data.new ? "Add Artist" : "Update Artist";

    return (
      <html>
        <Head />

        <body>
          <div className="container">
            <div className="row my-3">
              <div className="col-6 offset-3">
                <form action="/artists/new" method="post">
                  <div className="form-group">
                    <input className="form-control"
                           name="name"
                           placeholder={nameHolder} /><br />
                    <input className="form-control"
                           name="photo_url"
                           placeholder={photoHolder} /><br />
                    <input className="form-control"
                           name="nationality"
                           placeholder={nationalityHolder} /><br />
                    <input className="btn btn-outline-info btn-block"
                           type="submit"
                           value={buttonText}/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistForm;

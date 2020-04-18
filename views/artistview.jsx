const React = require('react');
const Head = require('./head');

class ArtistView extends React.Component {
  render() {
    console.log(this.props);
    let editLink = `${this.props.artist.id}/edit`
    let deleteLink = `${this.props.artist.id}/delete`;

    let prevLink = `${this.props.prevArtistId}`;
    let prevClass = this.props.prevArtistId === 0 ?
                    "btn btn-outline-info btn-block disabled" :
                    "btn btn-info btn-block";

    let nextLink = `${this.props.nextArtistId}`;
    let nextClass = this.props.nextArtistId === 0 ?
                    "btn btn-outline-info btn-block disabled" :
                    "btn btn-info btn-block";

    return (
      <html>
        <Head />

        <body>
          <div className="container text-center">

            <div className="row my-3">
              <div className="col-6 offset-3">

                <div className="row my-3">
                  <div className="col-2">
                    <a href={prevLink}
                       className={prevClass}>
                      Prev
                    </a>
                  </div>
                  <div className="col-8">
                    <a href="/artists"
                       className="btn btn-info btn-block">
                      Back to Browse
                    </a>
                  </div>
                  <div className="col-2">
                    <a href={nextLink}
                       className={nextClass}>
                      Next
                    </a>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col">
                    <h4>{this.props.artist.name}</h4>
                    <img src={this.props.artist.photo_url}
                         width="200px"/>
                    <h4>{this.props.artist.nationality}</h4>
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-6">
                    <a href={editLink}
                       className="btn btn-info btn-block">Edit Artist Info</a>
                  </div>
                  <div className="col-6">
                    <a href={deleteLink}
                       className="btn btn-outline-danger btn-block">Delete Artist</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistView;

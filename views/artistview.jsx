const React = require('react');
const Head = require('./head');

class ArtistView extends React.Component {
  render() {
    return (
      <html>
        <Head />

        <body>
          <div className="container text-center">
            <div className="row my-3">
              <div className="col-8 offset-2">
                <h4>{this.props.artist.name}</h4>
                <img src={this.props.artist.photo_url}
                     width="200px"/>
                <h4>{this.props.artist.nationality}</h4>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistView;

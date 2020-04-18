const React = require('react');
const Head = require('./head');

class ArtistList extends React.Component {
  render() {
    let artistdata = this.props.artistlist;
    let artists = artistdata.map(artist => {
      let key = `artist-${artist.id}`;
      let link = `/artists/${artist.id}`;
      return (
        <a className="text-info list-group-item list-group-item-action"
           href={link}>{artist.name}</a>
      );
    });

    return (
      <html>
        <Head />
        <body>
          <div className="container">
            <div className="row my-3">
              <div className="col-6 offset-3">
                <ul className="list-group">
                  {artists}
                </ul>
                <a href="/artists/new" className="btn btn-info btn-block">Add New Artist</a>
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = ArtistList;

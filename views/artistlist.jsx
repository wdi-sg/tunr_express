const React = require('react');
const Template = require('./template');

class ArtistList extends Template {
  constructor(props) {
    super(props);
    this.title = "Artists";
  }

  renderContent() {
    let artistdata = this.props.artistlist;
    let artists = artistdata.map(artist => {
      let key = `artist-${artist.id}`;
      let link = `/artists/${artist.id}`;
      return (
        <a key={key} className="text-info list-group-item list-group-item-action"
           href={link}>{artist.name}</a>
      );
    });

    return (
      <React.Fragment>
        <ul className="list-group">
          {artists}
        </ul>
        <a href="/artists/new"
           className="btn btn-info btn-block my-3">
          Add New Artist
        </a>
      </React.Fragment>
    );
  }
}

module.exports = ArtistList;

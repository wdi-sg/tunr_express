const React = require('react');
const Template = require('./template');

class PlaylistList extends Template {
  constructor(props) {
    super(props);
    this.title = "Playlists";
  }

  renderContent() {
    let playlistdata = this.props.playlists;
    let playlists = playlistdata.map(list => {
      let key = `list-${list.id}`;
      let link = `/playlists/${list.id}`;

      return (
        <a key={key} className="text-info list-group-item list-group-item-action"
           href={link}>{list.name}</a>
      );
    });

    return (
      <React.Fragment>
        <ul className="list-group">
          {playlists}
        </ul>
        <a href="/playlists/new"
           className="btn btn-info btn-block my-3">
          Add New Playlist
        </a>
      </React.Fragment>
    );
  }
}

module.exports = PlaylistList;

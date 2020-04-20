const React = require('react');
const Head = require('./head');
const Nav = require('./nav');

class PlaylistList extends React.Component {
  render() {
    let playlistdata = this.props.playlists;
    let playlists = playlistdata.map(list => {
      let key = `list`;
      let link = `/playlists/${list.id}`;

      return (
        <a key={key} className="text-info list-group-item list-group-item-action"
           href={link}>{list.name}</a>
      );
    });

    return (
      <html>
        <Head />

        <body>
          <div className="container">
            <div className="row my-3">
              <div className="col-8 offset-2">
                <Nav />

                <ul className="list-group">
                  {playlists}
                </ul>
                <a href="/playlists/new"
                   className="btn btn-info btn-block my-3">
                  Add New Playlist
                </a>

              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = PlaylistList;

var React = require("react");
var DefaultLayout = require('./layouts/default');

class Playlists extends React.Component {
  render() {

    const playlists = this.props[0].map( (playlist) => {
            return (
                <div style={{marginTop: '50px'}}>
                    <a href={`http://localhost:3000/playlists/${playlist.name}`}><h1>{playlist.name}</h1></a>
                </div>
            );
    });

    return (
        <DefaultLayout>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addPlaylistModal" style={{float: 'right'}}>
              Add New Playlist
            </button>
            <div class="modal fade" id="addPlaylistModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Adding New Playlist</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form method="POST" action={`/playlists/new`}>
                            <input type="" name="title" placeholder="Song Title"/>
                            <input type="" name="album" placeholder="Album"/>
                            <input type="" name="preview_link" placeholder="preview_link" />
                            <input type="" name="artwork" placeholder="artwork" />
                            <input type="submit"/>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            {playlists}
        </DefaultLayout>
    );
  }
}

module.exports = Playlists;

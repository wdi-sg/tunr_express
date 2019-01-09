var React = require("react");
var DefaultLayout = require('./layouts/default');

class Songs extends React.Component {
  render() {

    const songs = this.props[0].map( (song) => {
            return (
                <div style={{marginTop: '50px'}}>
                    <a href={`http://localhost:3000/${this.props[1][0].name}/songs/${song.title}`}><h1>{song.title}</h1></a>
                </div>
            );
    });

    return (
        <DefaultLayout>
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addSongModal" style={{float: 'right'}}>
              Add New Song
            </button>
            <div class="modal fade" id="addSongModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Adding New Song</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form method="POST" action={`/${this.props[1][0].name}/songs/new`}>
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
            {songs}
        </DefaultLayout>
    );
  }
}

module.exports = Songs;

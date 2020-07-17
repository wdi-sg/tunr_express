var React = require("react");
const Layout = require('./c-layout.jsx');

class AddArtist extends React.Component {
  render() {
    return (
        <Layout>

        <form class="text-light" method="POST" action={"/artist/"+this.props.rows[0].id+'/songs/'}>
            <div class="text-center">
            <h2>{this.props.rows[0].name}</h2>
                </div>
              <img src={this.props.rows[0].photo_url} class="img-thumbnail rounded mx-auto d-block"/>
              <h4>Add New Song</h4>
          <div class="form-group">
            <label>Artist ID</label>
            <input type="text" class="form-control" value={this.props.rows[0].artist_id} name="artist_id" readonly/>
          </div>
          <div class="form-group">
            <label>Song Title</label>
            <input type="text" class="form-control" placeholder="Title" name="title"/>
          </div>
          <div class="form-group">
            <label>Album</label>
            <input type="text" class="form-control" placeholder="Album" name="album"/>
          </div>
         <div class="form-group">
            <label>Audio Link</label>
            <input type="text" class="form-control" placeholder="Audio URL" name="preview_link"/>
          </div>
          <div class="form-group">
            <label>Album Art</label>
            <input type="text" class="form-control" placeholder="Image URL" name="artwork"/>
          </div>

          <button type="submit" class="btn btn-primary">Add Song</button>
        </form>

        </Layout>
    );
  }
}

module.exports = AddArtist;
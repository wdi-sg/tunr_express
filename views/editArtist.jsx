var React = require("react");
const Layout = require('./c-layout.jsx');

class EditArtist extends React.Component {
  render() {
    return (
        <Layout>
        <div>
        <form class="text-light" method="POST" action={"/artist/"+this.props.rows[0].id+'?_method=PUT'}>
            <div class="text-center">
            <h2>Edit Details</h2>
            </div>
          <img src={this.props.rows[0].photo_url} class="img-thumbnail rounded mx-auto d-block"/>
          <div class="form-group">
            <label for="exampleInputEmail1">Artist Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" value={this.props.rows[0].name} name="name"/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Artist Nationality</label>
            <input type="text" class="form-control" value={this.props.rows[0].nationality} id="exampleInputPassword1" name="nationality"/>
          </div>
         <div class="form-group">
            <label for="exampleInputPassword1">Artist Photo URL</label>
            <input type="text" class="form-control" id="exampleInputPassword1" value={this.props.rows[0].photo_url} name="photo_url"/>
          </div>

          <button type="submit" class="btn btn-primary">Edit Artist</button>
        </form>

        <form method="POST" action={"/artist/"+this.props.rows[0].id+"?_method=DELETE"}>
            <button type="submit" class="btn btn-primary btn-danger">Delete Artist</button>
        </form>

      </div>
        </Layout>
    );
  }
}

module.exports = EditArtist;
var React = require("react");
const Layout = require('./c-layout.jsx');

class AddArtist extends React.Component {
  render() {
    return (
        <Layout>

        <form class="text-light" method="POST" action={"/artist"}>
          <div class="form-group">
            <label for="exampleInputEmail1">Artist Name</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Name" name="name"/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Artist Nationality</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Nationality" name="nationality"/>
          </div>
         <div class="form-group">
            <label for="exampleInputPassword1">Artist Photo URL</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Photo URL" name="photo_url"/>
          </div>

          <button type="submit" class="btn btn-primary">Add Artist</button>
        </form>

        </Layout>
    );
  }
}

module.exports = AddArtist;
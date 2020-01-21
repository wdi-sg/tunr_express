const React = require("react");
const Layout = require("./layout");

class Edit extends React.Component {
  render() {
    const artist = this.props.artists;
    const editPath = "/artists/" + artist.id + "?_method=put";
    return (
      <Layout>
        <div className="container">
          <form action={editPath} method="POST">
            <div class="form-group">
              <label for="exampleInputEmail1">Artist Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="name"
                placeholder={artist.name}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Photo URL</label>
              <input
                type="url"
                class="form-control"
                id="exampleInputPassword1"
                name="photoURL"
                placeholder={artist.photo_url}
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Nationality</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="nationality"
                placeholder={artist.nationality}
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = Edit;

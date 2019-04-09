var React = require("react");
var DefaultLayout = require("./default.jsx");

class Edit extends React.Component {
  render() {
    // JS Here!!
    const artist = this.props.artist[0]; // {}
    const actionLink = `/artist/${artist.id}?_method=PUT`;
    return (
        <DefaultLayout title = "Edit Artist">
          <form action = {actionLink} method = "POST">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name = "name" value = {artist.name} class="form-control" />
              </div>
              <div class="form-group">
                <label for="photo_url">Photo URL</label>
                <input type="text" name = "photo_url" value = {artist["photo_url"]} class="form-control" />
              </div>
              <div class="form-group">
                <label for="nationality">Nationality</label>
                <input type="text" name = "nationality" value = {artist.nationality} class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </DefaultLayout>
    );
  }
}

module.exports = Edit;
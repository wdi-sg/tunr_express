const React = require("react");
const DefaultLayout = require("./default.jsx");

class New extends React.Component {
  render() {
    // JS Here!!
    const actionLink = `/artist`;
    return (
        <DefaultLayout title = "New Artist">
          <form action = {actionLink} method = "POST">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name = "name" class="form-control" />
              </div>
              <div class="form-group">
                <label for="photo_url">Photo URL</label>
                <input type="text" name = "photo_url" class="form-control" />
              </div>
              <div class="form-group">
                <label for="nationality">Nationality</label>
                <input type="text" name = "nationality" class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </DefaultLayout>
    );
  }
}

module.exports = New;
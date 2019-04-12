const React = require("react");
const DefaultLayout = require("./default.jsx");

class New extends React.Component {
  render() {
    // JS Here!!
    // this.props.id = 5
    const reqId = this.props.id;
    const actionLink = `/artist/${reqId}/songs`;
    return (
        <DefaultLayout title="New Song">
          <form action={actionLink}  method="POST">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" class="form-control" />
            </div>
            <div class="form-group">
                <label for="album">Album</label>
                <input type="text" name="album" class="form-control" />
            </div>
            <div class="form-group">
                <label for="preview_link">Preview Link</label>
                <input type="text" name="preview_link" class="form-control" />
            </div>
            <div class="form-group">
                <label for="artwork">Artwork</label>
                <input type="text" name="artwork" class="form-control" />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </DefaultLayout>
    );
  }
}

module.exports = New;
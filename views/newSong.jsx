var React = require("react");
const Layout = require("./layout");

class newSong extends React.Component {
  render() {
    let postPath;
    const artists = this.props.artists;
    const artistElement = artists.map(artist => {
      postPath = "/artists/" + artist.id + "/songs/";
      return <option value={artist.id}>{artist.name}</option>;
    });
    
    return (
      <Layout username={this.props.username}>
        <div className="container">
          <form action={postPath} method="POST">
            <label>Artist</label>
            <select className="form-control form-group" name="id">
              {artistElement}
            </select>
            <div class="form-group">
              <label for="exampleInputEmail1">Title</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="title"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Album</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                name="album"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Preview Link</label>
              <input
                type="url"
                class="form-control"
                id="exampleInputPassword1"
                name="preview_link"
                required
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Artwork</label>
              <input
                type="url"
                class="form-control"
                id="exampleInputPassword1"
                name="artwork"
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

module.exports = newSong;

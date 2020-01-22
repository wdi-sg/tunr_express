var React = require("react");
const Layout = require("./layout");

class New extends React.Component {
  render() {
    return (
      <Layout>
          <h1>Add a new playlist</h1>
          <div class="artists">
            <form action="/playlist" method="POST">
              <div class="form-row">
                <span class="artist-name">Name of Playlist:</span><br></br>
                <input class="input-text" type="text" name="name" />
              </div>
              <input class="button-submit" type="submit" />
            </form>
          </div>
      </Layout>
    );
  }
}

module.exports = New;

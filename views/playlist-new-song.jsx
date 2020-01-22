var React = require("react");
const Layout = require("./layout");

class New extends React.Component {
  render() {
    let listOfSongs = this.props.songs.map(item => {
        return <option value={item.title}>{item.title}</option>
    });
    return (
      <Layout>
          <h1>Add a new song to playlist</h1>
          <div class="artists">
            <form action="/playlist" method="POST">
              <div class="form-row">
                <span class="artist-name">Name of Playlist:</span><br></br>
                <input class="input-text" type="text" name="name" />
              </div>
              <select>
                {listOfSongs}
              </select>
              <input class="button-submit" type="submit" />
            </form>
          </div>
      </Layout>
    );
  }
}

module.exports = New;

var React = require("react");
const Layout = require("./layout");

class New extends React.Component {
  render() {
    let songUrl = "/playlist/"+this.props.songs.id;
    let listOfSongs = this.props.songs.map(item => {
        return <option name="id" value={item.id}>{item.title}</option>
    });
    return (
      <Layout>
          <h1>Add a new song to playlist</h1>
          <div class="artists">
            <form action={songUrl} method="POST">
              <div class="form-row">
                <span class="artist-name">Select your song:</span><br></br>
                <select class="songs">
                    {listOfSongs}
                </select>
              </div>
              <input class="button-submit" type="submit" />
            </form>
          </div>
      </Layout>
    );
  }
}

module.exports = New;

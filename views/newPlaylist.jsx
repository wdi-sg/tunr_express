const React = require("react");
const Layout = require("./layout");

class newPlaylist extends React.Component {
  render() {
    const songs = this.props.songs;
    const songOptions = songs.map(song => {
      return <option value={song.title}>{song.title}</option>;
    });
    return (
      <Layout>
        <div className="container d-flex justify-content-center">
          <form action="/playlist" method="POST">
            <div>
              <select name="song" className="custom-select col-10">
                {songOptions}
              </select>
              <input className="btn btn-primary col-2" type="submit"></input>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = newPlaylist;

const React = require("react");
const Layout = require("./layout");

class Favorites extends React.Component {
  render() {
    const songs = this.props.songs;
    const songElement = songs.map(song => {
      return <option value={song.id}>{song.title}</option>;
    });

    return (
      <Layout>
        <div className="container d-flex justify-content-center">
          <form action="/favorites" method="post" className="form-inline">
            <select className="form-control mr-3" name="song_id">
              {songElement}
            </select>
            <input className="btn btn-primary" type="submit" />
          </form>
        </div>
      </Layout>
    );
  }
}

module.exports = Favorites;

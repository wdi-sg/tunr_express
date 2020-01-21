const React = require("react");
const Layout = require("./layout");

class Songs extends React.Component {
  render() {
    const artist = this.props.artist;
    const songs = this.props.songs;
    const newSongPath = "/artists/" + artist.id + "/songs/new";
    const songElement = songs.map(song => {
      return (
        <h6 className="text-center px-2">
          <a href={song.preview_link}>{song.title}</a>
        </h6>
      );
    });
    return (
      <Layout>
        <div className="container d-flex justify-content-around">
          <div className="row">
            <div
              className="card col-xl-6 mx-auto mb-5"
              style={{ maxHeight: "450px" }}
            >
              <img
                className="card-img-top mx-auto d-block mt-5"
                src={artist.photo_url}
                alt="Card image cap"
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{artist.name}</h5>
                <h5 className="card-text text-center">{artist.nationality}</h5>
                <button className="btn btn-success mx-auto">
                  <a className="text-light" href={newSongPath}>Add new song</a>
                </button>
              </div>
            </div>
            <div className="col-xl-6">{songElement}</div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Songs;

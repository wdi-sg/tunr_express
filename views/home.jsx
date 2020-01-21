const React = require("react");
const Layout = require("./layout");

class Home extends React.Component {
  render() {
    let artistElement;
    console.log(this.props.artists);
    const artists = this.props.artists;

    if (artists.length > 1) {
      artistElement = artists.map(artist => {
        const artistPath = "/artists/" + artist.id;
        return (
          <div className="card mb-5">
            <div>
              <a href={artistPath}>
                <img
                  className="card-img-top mx-auto d-block mt-5"
                  src={artist.photo_url}
                  alt="Card image cap"
                />
              </a>
            </div>
            <div className="card-body">
              <h5 className="card-title text-center">{artist.name}</h5>
              <h5 className="card-text text-center">{artist.nationality}</h5>
            </div>
          </div>
        );
      });
    } else {
      const artistPath = artists.id;
      const deletePath = "/artists/" + artists.id + "?_method=delete";
      const songsPath = artistPath + "/songs";
      artistElement = (
        <div className="card">
          <a href={artistPath}>
            <img
              className="card-img-top mx-auto d-block mt-5"
              src={artists.photo_url}
              alt="Card image cap"
            />
          </a>
          <div className="card-body">
            <h5 className="card-title text-center">{artists.name}</h5>
            <h5 className="card-text text-center">{artists.nationality}</h5>
            <h6 className="text-center">
              <a href={songsPath}>See All Songs</a>
            </h6>
            <form
              className="d-flex justify-content-center"
              action={deletePath}
              method="POST"
            >
              <input
                className="btn btn-danger"
                type="submit"
                value="Delete artist?"
              />
            </form>
          </div>
        </div>
      );
    }

    return (
      <Layout>
        <div className="container">
          <div className="row d-flex justify-content-around">
            {artistElement}
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Home;

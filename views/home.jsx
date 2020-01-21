const React = require("react");
const Layout = require("./layout");

class Home extends React.Component {
  render() {
    let artistElement;
    console.log(this.props.artists);
    const artists = this.props.artists;
    if (artists.length > 1) {
      artistElement = artists.map(artist => {
        return (
          <div className="card mb-5">
            <img
              className="card-img-top mx-auto d-block mt-5"
              src={artist.photo_url}
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title text-center">{artist.name}</h5>
              <h5 className="card-text text-center">{artist.nationality}</h5>
            </div>
          </div>
        );
      });
    } else {
      artistElement = (
        <div className="card">
          <img
            className="card-img-top mx-auto d-block mt-5"
            src={artists.photo_url}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title text-center">{artists.name}</h5>
            <h5 className="card-text text-center">{artists.nationality}</h5>
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

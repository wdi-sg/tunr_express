const React = require('react');
const Layout = require('./layouts/layout');

class Artists extends React.Component {
  render() {
    const content = this.props.artists.map(artist => (
      <div className="col">
        <div className="card h-100">
          <img className="card-img-top img-fluid" src={artist.photo_url} alt="Artist Image" />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title ">{artist.name}</h5>
            <p className="card-text" />
            <a href="#" className="btn btn-primary mt-auto">
              IMPLEMENT SONGS LINK HERE
            </a>
          </div>
        </div>
      </div>
    ));
    return (
      <Layout title="Artists">
        <div className="row mt-5">{content}</div>
      </Layout>
    );
  }
}

module.exports = Artists;

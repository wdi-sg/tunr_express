const React = require('react');
const Layout = require('./layouts/layout');

class Artists extends React.Component {
  render() {
    const content = this.props.artists.map((artist) => {
      const url = `/artists/${artist.id}`;
      return (
        <div className="col mb-5">
          <div className="card h-100" style={{ width: '20rem' }}>
            <h5 className="card-header">{artist.name}</h5>
            <img className="card-img-top img-fluid" src={artist.photo_url} alt="Artist Image" />
            <div className="card-body d-flex flex-column">
              <p className="card-text" />
              <a href={url} className="btn btn-light mt-auto">
                &bull; &bull; &bull;
              </a>
            </div>
          </div>
        </div>
      );
    });
    return (
      <Layout title="Artists">
        <div className="row mt-5">{content}</div>
      </Layout>
    );
  }
}

module.exports = Artists;

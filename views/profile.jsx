const React = require('react');
const Layout = require('./layouts/layout');

class Profile extends React.Component {
  render() {
    const content = this.props.artist.map(detail => (
        <div className="col mx-auto">
          <div className="card h-100 w-25 mx-auto">
            <h5 className="card-header">{detail.name}</h5>
            <img className="card-img-top img-fluid" src={detail.photo_url} alt="Artist Image" />
            <div className="card-body d-flex flex-column">
              <p className="card-text">{detail.nationality}</p>
            </div>
          </div>
        </div>
    ));
    return (
      <Layout title={this.props.artist[0].name}>
        <div className="row mt-5">{content}</div>
      </Layout>
    );
  }
}

module.exports = Profile;

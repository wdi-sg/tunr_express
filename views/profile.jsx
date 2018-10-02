const React = require('react');
const Layout = require('./layouts/layout');

class Profile extends React.Component {
  render() {
    const actionUrl = `/artists/${this.props.artist[0].id}?_method=DELETE`;
    return (
      <Layout title={this.props.artist[0].name}>
        <div className="row mt-5">
          <div className="col mx-auto">
            <div className="card h-100 w-25 mx-auto">
              <h5 className="card-header">{this.props.artist[0].name}</h5>
              <img
                className="card-img-top img-fluid"
                src={this.props.artist[0].photo_url}
                alt="Artist Image"
              />
              <div className="card-body d-flex flex-column">
                <p className="card-text">{this.props.artist[0].nationality}</p>
                <form action={actionUrl} method="post">
                  <input className="btn btn-danger" type="submit" value="Delete" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Profile;

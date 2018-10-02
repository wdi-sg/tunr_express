const React = require('react');
const Layout = require('./layouts/layout');

class Create extends React.Component {
  render() {
    const actionUrl = `/artists/${this.props.artist[0].id}?_method=PUT`;
    return (
      <Layout title="Artists">
        <div className="row mt-5 w-50 mx-auto">
          <div className="col">
            <h1>Edit artist.</h1>
            <hr />
            <form action={actionUrl} method="post">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control mb-2"
                name="name"
                placeholder={this.props.artist[0].name}
                required
              />
              <label htmlFor="photo_url">Image Link</label>
              <input
                type="text"
                className="form-control mb-2"
                name="photourl"
                placeholder={this.props.artist[0].photo_url}
              />
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                className="form-control mb-2"
                name="nationality"
                placeholder={this.props.artist[0].nationality}
                required
              />
              <input type="submit" className="btn btn-secondary align-right" />
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Create;

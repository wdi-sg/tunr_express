const React = require('react');
const Layout = require('./layouts/layout');

class Create extends React.Component {
  render() {
    console.log(this !== 'string');
    return (
      <Layout title="Artists">
        <div className="row mt-5 w-50 mx-auto">
          <div className="col">
            <h1>ADD</h1>
            <hr />
            <form action="/artists" method="post">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control mb-2" name="name" required />
              <label htmlFor="photo_url">Image Link</label>
              <input type="text" className="form-control mb-2" name="photourl" />
              <label htmlFor="nationality">Nationality</label>
              <input type="text" className="form-control mb-2" name="nationality" required />
              <input type="submit" className="btn btn-secondary align-right" />
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

module.exports = Create;

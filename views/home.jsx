var React = require("react");
const Layout = require('./c-layout.jsx');

class Homepage extends React.Component {
  render() {
    return (
        <Layout>
        {this.props.rows.map(artist =>

        <div class="col-md-4">
          <div class="card mb-4 shadow-sm">
            <img src={artist.photo_url} class="img-thumbnail"/>
            <div class="card-body">
              <h3>{artist.name}</h3>
              <p class="card-text">{artist.nationality}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <a href={"/artist/"+artist.id} class="btn btn-sm btn-outline-secondary">View</a>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">x mins</small>
              </div>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
          </div>
        </div>
        )}
        </Layout>
    );
  }
}

module.exports = Homepage;
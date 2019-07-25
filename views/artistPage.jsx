var React = require("react");
const Layout = require('./c-layout.jsx');

const audioStyle = {
    width: "100%"
}
const thStyle = {
    width: "40%"
}

class ArtistPage extends React.Component {
  render() {

    // let component = (<p>Add songs!</p>);

    // if (this.props.rows.length === 0) {
    //     component = (<p>No Songs Found!</p>);
    // } else {
    //     component = null;
    // }
    // {component}

    return (
        <Layout>

            <div class="text-center text-light">
            <h2>{this.props.rows[0].name}</h2>
            <a href={'/artist/'+this.props.rows[0].id+'/songs/new'} class="btn btn-primary my-2">Add New Song</a>
            <img src={this.props.rows[0].photo_url} class="img-thumbnail rounded mx-auto d-block"/>
            </div>

            <table class="table table-sm table-striped table-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Album Art</th>
                  <th scope="col">Album</th>
                  <th scope="col">Song Title</th>
                  <th style={thStyle} scope="col">Preview Link</th>
                </tr>
              </thead>
              <tbody>
                {this.props.rows.map(song =>
                <tr>
                  <th scope="row">{song.artist_id}</th>
                  <td><img src={song.artwork} class="img-thumbnail"/></td>
                  <td>{song.album}</td>
                  <td>{song.title}</td>
                  <td><audio style={audioStyle} controls>
                      <source src={song.preview_link} type="audio/mpeg"/>
                  </audio></td>
                </tr>
                )}
              </tbody>
            </table>


        </Layout>
    );
  }
}

module.exports = ArtistPage;
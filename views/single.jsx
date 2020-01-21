var React = require("react");
const Layout = require("./layout");

class Single extends React.Component {
  render() {
    return (
      <Layout>
          <div class="breadcrumb">
              <a href="/artists">Main Artists</a> - {this.props.artists.name}
          </div>
          <div class="artist">
            <div class="artist-image">
                <img src={this.props.artists.photo_url}></img>
            </div>
            <div class="artist-description">
                <h1>{this.props.artists.name}</h1>
                Nationality: {this.props.artists.nationality} <br /> <br /> <br />
                <div class="button-submit">Edit</div> <br />
                <div class="button-submit">Delete</div>
            </div>
          </div>
      </Layout>
    );
  }
}

module.exports = Single;

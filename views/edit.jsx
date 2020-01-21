var React = require("react");
const Layout = require("./layout");

class New extends React.Component {
  render() {
    return (
      <Layout>
          <h1>Edit artist: {this.props.artists.name}</h1>
          <div class="artists">
            <form action="/artists" method="POST">
              <div class="form-row">
                <span class="artist-name">Name of Artist:</span><br></br>
                <input class="input-text" type="text" name="name" placeholder="Cardi B" value={this.props.artists.name}/>
              </div>
              <div class="form-row">
                <span class="artist-name">URL of image:</span><br></br>
                <input class="input-text" type="text" name="url" placeholder="http://imgur.com/iUajnd" value={this.props.artists.photo_url}/>
              </div>
              <div class="form-row">
                <span class="artist-name">Nationality of Artist:</span><br></br>
                <input class="input-text" type="text" name="nationality" placeholder="Singaporean" value={this.props.artists.nationality}/>
              </div>
              <input class="button-submit" type="submit" />
            </form>
          </div>
      </Layout>
    );
  }
}

module.exports = New;

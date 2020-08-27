var React = require("react");
const Layout = require("./layout");

class New extends React.Component {
  render() {
    const id = this.props.artists.id;
    const actionUrl = "/artists/"+id+"?_method=put";
    return (
      <Layout>
          <h1>Edit artist: {this.props.artists.name}</h1>
          <div class="artists">
            <form action={actionUrl} method="POST">
              <div class="form-row">
                <span class="artist-name">Name of Artist:</span><br></br>
                <input class="input-text" type="text" name="name"  value={this.props.artists.name}/>
              </div>
              <div class="form-row">
                <span class="artist-name">URL of image:</span><br></br>
                <input class="input-text" type="text" name="url" value={this.props.artists.photo_url}/>
              </div>
              <div class="form-row">
                <span class="artist-name">Nationality of Artist:</span><br></br>
                <input class="input-text" type="text" name="nationality"   value={this.props.artists.nationality}/>
              </div>
              <input class="button-submit" type="submit" />
            </form>
          </div>
      </Layout>
    );
  }
}

module.exports = New;

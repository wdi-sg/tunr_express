var React = require("react");
const Layout = require('./layout.jsx');

class Editartist extends React.Component {
  render() {

    return (
      <html>
<Layout>
            <h1>Edit this artist!</h1>
            <form method="POST" action={"/artists/"+ this.props.artist.id + "?_method=PUT"}>
                <p>Artist Id: <input type="text" name="id" value={this.props.artist.id} readonly/></p>
                <p>Artist Name: {this.props.artist.name} <br />
                 <input type="text" name="name" value={this.props.artist.name}/></p>
                <p>Artist Nationality: {this.props.artist.nationality} <br />
                 <input type="text" name="nationality" value={this.props.artist.nationality}/></p>
                <p>Image: <input type="text" name="photo_url" value={this.props.artist.photo_url}/> <img src={`${this.props.artist.photo_url}`} height="200" width="200" /></p>
                <p>--</p>
                <input type="submit" value="Submit" />
            </form>
</Layout>
    );
  }
}

module.exports = Editartist;
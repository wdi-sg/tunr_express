var React = require("react");

class Deleteartist extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
            <h1>Confirm <strong>deletion</strong> of this artist!</h1>
            <form method="POST" action={"/artists/"+ this.props.artist.id + "?_method=DELETE"}>
                <p>Artist Id: <input type="text" name="id" value={this.props.artist.id} readonly/></p>
                <p>Artist Name: {this.props.artist.name}</p>
                <p>Artist Nationality: {this.props.artist.nationality} </p>
                <p>Image: <img src={`${this.props.artist.photo_url}`} height="200" width="200" /></p>
                <p>--</p>
                <input type="submit" value="Submit" />
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Deleteartist;
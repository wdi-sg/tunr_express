var React = require("react");

class EditArtistInfo extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>You are editing the information of {this.props.artistName}</h1>
          <form action={"/artists/" + this.props.artistID + "?_method=PUT"} method="POST">
              Name: <input type="text" name="artistName" value={this.props.artistName} />
              <br />
              Photo URL: <input type="text" name="photoURL" value={this.props.photoURL} />
              <br />
              Nationality: <input type="text" name="nationality" value={this.props.nationality} />
              <br />
              <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = EditArtistInfo;

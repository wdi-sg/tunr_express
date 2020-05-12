var React = require("react");

class DeleteArtist extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <h1>You are deleting the information of {this.props.artistName}</h1>
          <form action={"/artists/" + this.props.artistID + "?_method=DELETE"} method="POST">
              Name: <input type="text" name="artistName" value={this.props.artistName} readOnly />
              <br />
              Photo URL: <input type="text" name="photoURL" value={this.props.photoURL} readOnly />
              <br />
              Nationality: <input type="text" name="nationality" value={this.props.nationality} readOnly />
              <br />
              <input type="submit" value="Confirm Delete" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = DeleteArtist;

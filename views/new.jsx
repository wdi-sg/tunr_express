var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>Tuner</h1>
          <h3>
            <form method="POST" action="/artists">
              <input
                type="hidden"
                name="id"
                value={this.props.artist ? this.props.artist.id : ""}
              />
              Artist's Name:{" "}
              <input
                type="text"
                name="name"
                value={this.props.artist ? this.props.artist.name : ""}
              />{" "}
              <br />
              <br />
              Photo URL:{" "}
              <input
                type="text"
                name="photoURL"
                value={this.props.artist ? this.props.artist.photo_url : " "}
              />{" "}
              <br />
              <br />
              Nationality:{" "}
              <input
                type="text"
                name="nationality"
                value={this.props.artist ? this.props.artist.nationality : " "}
              />{" "}
              <br />
              <br />
              <input type="submit" value="submit" />
              <input
                type="submit"
                value="delete"
                formaction="/artists/?_method=delete"
              />
            </form>
          </h3>
        </body>
      </html>
    );
  }
}

module.exports = New;

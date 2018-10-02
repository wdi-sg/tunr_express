var React = require("react");

class ArtistsShow extends React.Component {
  render() {
    const editUrl = `/artists/${this.props.id}/edit`;
    const deleteUrl = `/artists/${this.props.id}?_method=DELETE`;
    return (
      <html>
        <head />
        <body>
          <h1>{this.props.name}</h1>
          <a href={editUrl}>Edit</a>
          <form method="POST" action={deleteUrl}>
            <input type="submit" value="Delete" />
          </form>
          <p>
            <strong>Nationality: </strong>
            {this.props.nationality}
          </p>
          <img src={this.props.photo_url} alt={this.props.name} />
        </body>
      </html>
    );
  }
}

module.exports = ArtistsShow;

const React = require('react');

class SongsShow extends React.Component {
  render() {
    const editUrl = `/songs/${this.props.id}/edit`;
    const deleteUrl = `/songs/${this.props.id}?_method=DELETE`;
    return (
      <html>
        <head />
        <body>
          <h1>{this.props.title}</h1>
          <form action={editUrl}>
            <input type="submit" value="Edit" />
          </form>
          <form method="POST" action={deleteUrl}>
            <input type="submit" value="Delete" />
          </form>
          <p>
            <strong>Album: </strong>
            {this.props.album}
          </p>
          <p>
            <a href={this.props.preview_link}>Preview link</a>
          </p>
          <img src={this.props.artwork} alt={this.props.title} />
        </body>
      </html>
    );
  }
}

module.exports = SongsShow;

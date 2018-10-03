const React = require('react');

class SongsShow extends React.Component {
  render() {
    const editUrl = `/songs/${this.props.song.id}/edit`;
    const deleteUrl = `/songs/${this.props.song.id}?_method=DELETE`;
    const artist = this.props.artist ? this.props.artist.name : 'Unknown';
    return (
      <html>
        <head />
        <body>
          <h1>{this.props.song.title}</h1>
          <form action={editUrl}>
            <input type="submit" value="Edit" />
          </form>
          <form method="POST" action={deleteUrl}>
            <input type="submit" value="Delete" />
          </form>
          <p>
            <strong>Artist: </strong>
            {artist}
          </p>
          <p>
            <strong>Album: </strong>
            {this.props.song.album}
          </p>
          <p>
            <a href={this.props.song.preview_link}>Preview link</a>
          </p>
          <img src={this.props.song.artwork} alt={this.props.song.title} />
        </body>
      </html>
    );
  }
}

module.exports = SongsShow;

const React = require('react');

class ArtistsEdit extends React.Component {
  render() {
    const link = `/artists/${this.props.id}?_method=PUT`;
    return (
      <html>
        <head />
        <body>
          <h1>Edit Artist</h1>
          <form method="POST" action={link}>
            <p>Name</p>
            <input type="text" name="name" defaultValue={this.props.name} required />
            <p>Photo URL</p>
            <input type="url" name="photoUrl" defaultValue={this.props.photo_url} required />
            <p>Nationality</p>
            <input type="text" name="nationality" defaultValue={this.props.nationality} required />
            <br /><br />
            <input type="submit" value="Submit" />
          </form>
        </body>
      </html>
    );
  }
}

module.exports = ArtistsEdit;

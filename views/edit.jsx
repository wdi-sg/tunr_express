var React = require('react');

class Edit extends React.Component {
  render() {
    var url = "/artist/" + this.props.artists.id;
    var formAction = url + "?_method=PUT";
    return (
      <html>
        <body>
            <p><a href={url}>View This Artist</a></p>
            <h1>Edit Artist No. {this.props.artists.name}</h1>

            <form action={formAction} method="POST">
                <h3>Artist Name: </h3>
                <input className="artist-input-name" name="name" defaultValue={this.props.artists.name} />

                <h3>Artist Name: </h3>
                <input className="artist-input-photo" name="photo_url" defaultValue={this.props.artists.photo_url} />

                <h3>Artist Nationality: </h3>
                <input className="artist-input-nationality" name="nationality" defaultValue={this.props.artists.nationality} />

                <input className="submit-input-btn" type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = Edit;
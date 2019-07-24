var React = require('react');

class Delete extends React.Component {
  render() {

    var artist = this.props.artist;

    var url = `/artist/${this.props.artist.id}?_method=DELETE`;

    return (
      <html>
        <body>
          <div>
            <h1>Deleting Artist</h1>

            <form action={url} method="POST">

                <h3>Artist's Name: {artist.name}</h3>

                <h3>Artist's Photo_url: {artist.photo_url}</h3>

                <h3>Artist's Nationality: {artist.nationality}</h3>

                <input type = "submit"/>

            </form>

          </div>
        </body>
      </html>
    );
  }
}

module.exports = Delete;
var React = require("react");

class Artist extends React.Component {
  render() {
    let songs = '/artists/' + this.props.id + '/songs';
    let formEdit = '/artists/' + this.props.id + '/edit';
    let formDelete = '/artists/' + this.props.id + '?_method=delete';
    return (
      <html>
        <head />
        <body>
            <h1>{this.props.name}</h1>
            <img src={this.props.photo_url} alt={this.props.name} width="300"/>
            <h3>Nationality: {this.props.nationality}</h3>
            <form method="GET" action={songs}>
              <input type="submit" value="Songs"/>
            </form>
            <form method="GET" action={formEdit}>
              <input type="submit" value="Edit"/>
            </form>
            <form method="POST" action={formDelete}>
              <input type="submit" value="Delete"/>
            </form>
            <p><a href="http://localhost:3000/artists" alt="homepage">Back to Homepage</a></p>
        </body>
      </html>
    );
  }
}

module.exports = Artist;
var React = require('react');


class Oneartist extends React.Component {
  render() {
    return (

            <div>
                <h1>{this.props.artist.name}</h1>

                    <p>Artist Id: {this.props.artist.id}</p>
                    <p>Artist Name: {this.props.artist.name}</p>
                    <p>Artist Nationality: {this.props.artist.nationality}</p>
                    <p>Image: <img src={`${this.props.artist.photo_url}`} height="200" width="200" /></p>
                    <p>--</p>
                    <a href={`/artists/${this.props.artist.id}/edit`}>Edit this artist</a><br />
                    <a href={`/artists/${this.props.artist.id}/delete`}>Delete this artist</a>

            </div>

    );
  }
}

module.exports = Oneartist;
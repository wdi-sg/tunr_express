const React = require("react");
const Artist = require("./Artist");

class SingleArtist extends React.Component {
  render() {
    if (!this.props.artist) {
      return (
        <div>
          <h1>Artist id not found!</h1>
          <a href="/artists/">Return to main</a>
        </div>
      );
    }
    const { name, nationality, photo_url, id} = this.props.artist;
    return (
      <div>
          <strong>{this.props.msg}</strong>
          <Artist id={id} name={name} nationality={nationality} photo_url={photo_url}/>
          <a href="/artists/">back to main</a><br/>
          <a href={`/artists/${id}/edit`}>edit</a>
      </div>
    );
  }
}

module.exports = SingleArtist;

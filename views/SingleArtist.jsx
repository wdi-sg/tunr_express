const React = require("react");
const Artist = require("./Artist");

class SingleArtist extends React.Component {
  render() {
    const { name, nationality, photo_url} = this.props.artist;
    return (
      <div>
          <Artist name={name} nationality={nationality} photo_url={photo_url}/>
      </div>
    );
  }
}

module.exports = SingleArtist;

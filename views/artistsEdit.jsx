var React = require("react");
var Default = require("./default")

class ArtistEdit extends React.Component {
  render() {
    return (
      <Default>
        <h3>EDIT</h3>
        <form method='GET' action={`/artists/${this.props.artist.id}/edit`}>
                    <input type='submit' value='Edit'/>
                </form>
      </Default>
    );
  }
}

module.exports = ArtistEdit;
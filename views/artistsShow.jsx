var React = require("react");
var Default = require("./default")

class ArtistIndex extends React.Component {
  render() {

    return (
      <Default>
        <h2>Artist Index</h2>
        <h3>{this.props[0].name}</h3>

        <button type="button">Edit</button>

        <form method="POST" action={`/home/artist/${this.props[0].id}/delete?_method=DELETE`}>
            <input type="submit" value="delete"/>
        </form>
      </Default>
    );
  }
}

module.exports = ArtistIndex;

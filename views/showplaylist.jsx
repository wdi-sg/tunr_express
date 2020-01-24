var React = require("react");

class Showplaylist extends React.Component {
  render() {
    return (
      <div>
        <h1>Playlist Name:</h1>
        <ul>
        {this.props.name}
        </ul>
      </div>
    );
  }
}

module.exports = Showplaylist;
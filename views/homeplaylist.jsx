var React = require("react");

class Homeplaylist extends React.Component {
  render() {
    const playlists = this.props.playlists.map(playlists => {
      return <li key={playlists}>{playlists}</li>
    });

    return (
      <div>
        <h1>Playlists:</h1>
        <ul>
        {playlists}
        </ul>
      </div>
    );
  }
}

module.exports = Homeplaylist;
var React = require("react");

class Home extends React.Component {
  render() {
    const artists = this.props.artists.map(artists => {
      return <li key={artists}>{artists}</li>
    });

    return (
      <div>
        <h1>Artists:</h1>
        <ul>
        {artists}
        </ul>
      </div>
    );
  }
}

module.exports = Home;

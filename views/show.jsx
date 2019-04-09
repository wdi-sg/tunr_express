var React = require("react");

class Show extends React.Component {
  render() {
    // Javascript here
    // this.props.artist here is an arr with 1 obj..
    const artist = this.props.artist[0]; // {}
    const imgWidth = { width: '100%' };
    return (
      <div>
        <img style = {imgWidth} src = {artist["photo_url"]}/>
        <p>{artist.name}</p>
        <p>{artist.nationality}</p>
      </div>
    );
  }
}

module.exports = Show;
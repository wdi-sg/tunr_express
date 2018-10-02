var React = require('react');

class Index extends React.Component {
  render() {

    console.log("INSIDE REACT INDEX", this.props.artist );

    const artistName = this.props.artist.map((artists) => {
      return <li> {artists.name} </li>
    })

    return (
      <div>
        <h1>All Artists</h1>
        <ul> {artistName}</ul>
      </div>
    );
  }
}

module.exports = Index;
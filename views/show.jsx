var React = require('react');

class Show extends React.Component {
  render() {

    console.log("INSIDE REACT INDEX", this.props.artist[0].name );
    let artist = this.props.artist[0];
    let artistName = artist.name;
    let artistUrl = artist.photo_url;
    let artistNat = artist.nationality;

    return (
      <div>
        <h1>Artist's details</h1>
        <ul>
          <li> Artist's Name: {artistName}</li>
          <li> Artist's Photo: {artistUrl}</li>
          <li> Artist's Nationality: {artistNat}</li>
        </ul>
      </div>
    );
  }
}

module.exports = Show;
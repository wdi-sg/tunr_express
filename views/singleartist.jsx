var React = require('react');

class singleartist extends React.Component {
  render() {

    console.log("this.props.artists", this.props.artists[0].name);

    const artists = this.props.artists[0];

    return (
      <div>
        <h1>Artist</h1>
        <ul>
            <li>Name: {artists.name}</li>
            <li>Nationality: {artists.nationality}</li>
            <img src={artists.photo_url}/>
        </ul>
      </div>
    );
  }
}

module.exports = singleartist;
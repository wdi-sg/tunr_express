var React = require("react");

class artist extends React.Component {
  render() {

    const artistsId = this.props.artistsData[0].id
    const artistsName = this.props.artistsData[0].name
    const artistsPhotoUrl = this.props.artistsData[0].photo_url
    const artistsNationality = this.props.artistsData[0].nationality

    return (
      <html>
        <head />
        <body>
            <h1>Artist Details!</h1>
            <h1>ID: {artistsId}</h1>
            <h1>Name: {artistsName}</h1>
            <h1>photo:</h1>
            <img src={artistsPhotoUrl}/>
            <h1>Nationality: {artistsNationality}</h1>
        </body>
      </html>
    );
  }
}

module.exports = artist;
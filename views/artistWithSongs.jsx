var React = require('react');

class Artist extends React.Component {
  render() {
    const songListElements = this.props.songArray.map(song => {
        return <li>{song}</li>
    })
    const name = this.props.artistInfo.name;
    const photo_url = this.props.artistInfo.photo_url;
    const nationality = this.props.artistInfo.nationality;

    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <h1>Artist Name: {name}</h1>
            <img src = {photo_url} className="img-thumbnail img-fluid w-50" alt="Artist picture"></img>
            <h1>Nationality: {nationality}</h1>
          </div>
          <br></br>
          <div>
            <h1>List of Songs</h1>
            <ul>{songListElements}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Artist;
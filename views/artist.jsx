var React = require('react');

class Artist extends React.Component {
  render() {
    const name = this.props.artistInfo.name;
    const photo_url = this.props.artistInfo.photo_url;
    const nationality = this.props.artistInfo.nationality;
    const editLink = "/artists/" + this.props.artistInfo.id + "/edit";
    const songLink = "/artists/" + this.props.artistInfo.id + "/songs";
    const viewCount = this.props.visits;

    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <div>
            <h1>Artist Name: {name}</h1>
            <img src = {photo_url} className="img-thumbnail img-fluid w-50" alt="Artist picture"></img>
            <h1>Nationality: {nationality}</h1>
          </div>
          <form method="GET" action={songLink} className = "container">
                <button type="submit" className="btn btn-primary">See Artist Songs</button>
          </form>
          <br />
          <form method="GET" action={editLink} className = "container">
                <button type="submit" className="btn btn-primary">Edit Artist Details</button>
          </form>
          <h1>View Count: {viewCount}</h1>
        </body>
      </html>
    );
  }
}

module.exports = Artist;
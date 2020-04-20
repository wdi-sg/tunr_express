var React = require("react");

class Home extends React.Component {
  render() {
    const viewCount = this.props.visits;
    const artistListElements = this.props.artistsArray.map(artist => {
        let artistLink = "/artists/" + artist.id;
        return <li><a href = {artistLink}>{artist.name}</a></li>
    })
    return (
      <html>
        <head><link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link></head>
        <body>
          <h1>List of Artists</h1>
          <ol>{artistListElements}</ol>
          <form method="GET" action="/new" className = "container">
                    <button type="submit" className="btn btn-primary">Add New Artist</button>
          </form>
          <h1>View Count: {viewCount}</h1>
        </body>
      </html>
    );
  }
}

module.exports = Home;
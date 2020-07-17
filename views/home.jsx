var React = require("react");

class Home extends React.Component {
  render() {
     console.log(this.props.artists);

     let artistList = this.props.artists.map((artist,i) => {
        return (
            <div>
                <a href={`/artist/${artist.id}`}>
                <li>{artist.name}</li>
                </a>
            </div>)
     });
     // console.log("artist name: ", artistsList[0].name);

    return (
      <html>
        <body>
          <h1>Tunr</h1>
           <form action="/register" method="GET">
            <input type="submit" value="Register"/>
          </form>
           <form action="/login" method="GET">
            <input type="submit" value="Log in"/>
          </form>
          <h2>List of artists</h2>
          <ul>{artistList}</ul>
          <form action="/artist/new" method="GET">
            <input type="submit" value="Add a new artist"/>
          </form>

        </body>
      </html>
    );
  }
}

module.exports = Home;
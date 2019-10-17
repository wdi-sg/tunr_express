var React = require("react");

class Home extends React.Component {
  render() {
    const artists= this.props.artists.map(artist => {
        let link = '/artists/' + artist.id;
        return (
                <li>
                    <a href={link}>
                        {artist.name}<br/>
                        <img src={artist.photo_url} alt={artist.name} width="300"/>
                    </a>
                </li>
        );
    })
    return (
      <html>
        <head />
        <body>
          <h1>Welcome!</h1>
            <form method="GET" action='/register'>
              <input type="submit" value="Register An Account"/>
            </form>
            <form method="GET" action='/login'>
              <input type="submit" value="Login Account"/>
            </form>
            <form method="GET" action='/favorites'>
              <input type="submit" value="Favorites"/>
            </form>
            <form method="GET" action='/playlists'>
              <input type="submit" value="Playlists"/>
            </form>
          <h3>Artists</h3>
            <form method="GET" action='/artists/new'>
              <input type="submit" value="Add Artist"/>
            </form>
          <ul>
            {artists}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Home;
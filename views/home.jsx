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
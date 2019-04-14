var React = require("react");

class ArtistSongs extends React.Component {
  render() {
    const obj = this.props.songs[0];
    const list = this.props.songs.map((card) => {
      return (
        <tbody>
          <tr>
            <td>{card.id}</td>
            <td>{card.title}</td>
            <td>{card.album}</td>
            <td><a href={card.preview_link}>Link</a></td>
            <td><img width="100px" height="100px" src={card.artwork} alt="album artwork"/></td>
          </tr>
        </tbody>
      );
    });

    return (
      <html>
        <head />
        <body>
          <h1>Songs by {obj.name}</h1>
          <div><img width="500px" height="500px"src={obj.photo_url} alt="Photo of Artist" /></div>
          <div>
          <p><b>Artist ID: </b>{obj.artist_id}</p>
          <p><b>Artist Nationality: </b>{obj.nationality}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Song ID</th>
                <th>Song Title</th>
                <th>Album Name</th>
                <th>Preview link</th>
                <th>Artwork</th>
              </tr>
            </thead>
            {list}
          </table>
        </body>
      </html>
    );
  }
}

module.exports = ArtistSongs;
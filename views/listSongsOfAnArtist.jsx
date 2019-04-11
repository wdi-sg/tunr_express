var React = require("react");

class listSongsOfAnArtist extends React.Component {
  render() {
    const object = this.props.songs[0];
    const tablebody = this.props.songs.map(item => {
      return (
        <tbody>
          <tr>
            <td>{item.id}</td>
            <td>{item.title}</td>
            <td>{item.album}</td>
            <td><a style={{color:'black'}} href={item.preview_link}>Link</a></td>
            <td><img width="100px" src={item.artwork} alt="album artwork"/></td>
          </tr>
        </tbody>      
      );        
    });

    return (
      <html>
        <head />
        <body>
          <h1>Songs by {object.name}</h1>
          <div><img width="500px" src={object.photo_url} alt="Photo of Artist" /></div>
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
            {tablebody}
          </table>
        </body>
      </html>
    );
  }
}

module.exports = listSongsOfAnArtist;

var React = require("react");

class Home extends React.Component {
  render() {
    const seeSingleArtistPath = `/artists/${this.props.artists[0].id}`
    const tablebody = this.props.artists.map(item => {
      return (
        <tbody>
          <tr>
            <td>{item.id}</td>
            <td><a style={{color:'black'}} href={seeSingleArtistPath}>{item.name}</a></td>
            <td><img width="100px" src={item.photo_url} alt="photo of artist"/></td>
            <td>{item.nationality}</td>
          </tr>
        </tbody>        
      );        
    });

    return (
      <html>
        <head />
        <body>
          <h1>Welcome to Tunr! The world's #1 music catalog/player</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Photo</th>
                <th>Nationality</th>
              </tr>
            </thead>
            {tablebody}
          </table>
        </body>
      </html>
    );
  }
}

module.exports = Home;

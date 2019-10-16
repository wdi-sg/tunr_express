var React = require("react");

class showFavorites extends React.Component {
  render() {
    // const artistNames = this.props.artistNames;
    const songsDetail = this.props.songsDetail;
    const tablebody = songsDetail.map(item => {
      return (
        <tbody>
          <tr>
            <td>{item.title}</td>
            <td>{item.album}</td>
            <td><a style={{color:'black'}} href={item.preview_link}>Link</a></td>
            <td><img width="100px" src={item.artwork} alt="album artwork"/></td>
          </tr>
        </tbody>      
      );
    });
    // const tablebody = this.props.songsDetails.map(item => {
    //   return (
    //     <tbody>
    //       <tr>
    //         <td>{item.title}</td>
    //         <td>{item.artist_id}</td>
    //         <td>{item.album}</td>
    //         <td><a style={{color:'black'}} href={item.preview_link}>Link</a></td>
    //         <td><img width="100px" src={item.artwork} alt="album artwork"/></td>
    //       </tr>
    //     </tbody>      
    //   );        
    // });

    return (
      <html>
        <head />
        <body>
          <h1>Your favorite songs</h1>
          <table>
            <thead>
              <tr>
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

module.exports = showFavorites;

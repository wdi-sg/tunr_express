var React = require("react");

class Playlists extends React.Component {
  render() {
    let playlistInfo = this.props.rows;
    
    let playlist = playlistInfo.map(info => {
      return <h2>{info.name}</h2>
    })
    // console.log(artistInfo);

    return (
      <html>
        <head />
        <body>
          <div>
            {playlist}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Playlists;

var React = require("react");

class PlaylistSong extends React.Component {
  render() {
    let playlistInfo = this.props.rows;
    
    let playlist = playlistInfo.map(info => {
      return <li>{info.title}</li>
    })
    // console.log(playlistInfo);

    return (
      <html>
        <head/>
        <body>
            <h2>{playlistInfo[0].name}</h2>
            <div>
              <ul>
                  {playlist}
              </ul>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = PlaylistSong;

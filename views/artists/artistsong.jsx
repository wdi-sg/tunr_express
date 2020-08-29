var React = require("react");

class Artistsong extends React.Component {
  render() {
    let artistInfo = this.props.rows;
    let songs = artistInfo.map(song => {
      return <li>{song.title}</li>
    })

    return (
      <html>
        <head />
        <body>
          <div>
            <h3>Artist: {artistInfo[0].name}</h3>
            <img src={`${artistInfo[0].photo_url}`}  alt="artist" width="250"/>
            <div>
              <ul>
                {songs}
              </ul>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Artistsong;

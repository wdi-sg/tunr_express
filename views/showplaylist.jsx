var React = require("react");

class showPlaylist extends React.Component {
  render() {
    console.log('looping props********************');
    console.log(this.props.songs);
    const songDetail = this.props.songs.map(songDetails => {
        return <p>Song Title: {songDetails.title} <br></br> Album:{songDetails.album} <br></br> Artist ID: {songDetails.title}</p>
    })
    return (
      <html>
        <head />
        <body>
            <div>
                <h1>The playlist songs are:</h1>
            </div>
            <div>
                <ul>
                    {songDetail}
                </ul>
            </div>
            <p>The number of page count is: {this.props.cookie}</p>
        </body>
      </html>
    );
  }
}

module.exports = showPlaylist;
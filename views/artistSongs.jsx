var React = require("react");

class oneArtist extends React.Component {
  render() {
    console.log('looping props********************');
    const songNames = this.props.songs.map(songTitle => {
        return <li>{songTitle.title}</li>
    })
    return (
      <html>
        <head />
        <body>
            <div>
                <h1>The artist songs are:</h1>
            </div>
            <div>
                <ul>
                    {songNames}
                </ul>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = oneArtist;
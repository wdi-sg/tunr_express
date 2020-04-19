var React = require("react");

class Playlist extends React.Component {
  render() {
    console.log('looping props********************');
    const plNames = this.props.pl.map(plTitle => {
        return <li>{plTitle.name}</li>
    })
    return (
      <html>
        <head />
        <body>
            <div>
                <h1>The playlists are:</h1>
            </div>
            <div>
                <ul>
                    {plNames}
                </ul>
            </div>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;
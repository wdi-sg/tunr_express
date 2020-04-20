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
            <p>The number of page count is: {this.props.cookie}</p>
        </body>
      </html>
    );
  }
}

module.exports = Playlist;
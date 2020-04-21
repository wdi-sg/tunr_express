var React = require('react');
class Playlists extends React.Component {
  render() {
            const allSongs = this.props.showallsongs.map( song =>{
                return <li>{song.title}</li>
            })
    return (
      <html>
        <body>
          <div>
            <ul>{allSongs}</ul>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Playlists;
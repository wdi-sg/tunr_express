const React = require('react');

class ArtistsShowSongs extends React.Component {
  render() {
    const songs = this.props.songs.map(song => {
      const url = `/songs/${song.id}`;
      return (
        <li key={song.id}>
          <a href={url}>{song.title}</a>
        </li>
      );
    });

    return (
      <html>
        <head />
        <body>
          <ul>
            {songs}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = ArtistsShowSongs;

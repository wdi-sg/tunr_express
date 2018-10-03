const React = require('react');

class Songs extends React.Component {
  render() {
    const list = this.props.songs.map(song => {
      const path = `/songs/${song.id}`;
      return (
        <li key={song.id}>
          <a href={path}>{song.title}</a>
        </li>
      );
    });

    return (
      <html>
        <head />
        <body>
          <h1>Songs</h1>
          <form action="/songs/new">
            <input type="submit" value="New Song" />
          </form>
          <ul>
            {list}
          </ul>
        </body>
      </html>
    );
  }
}

module.exports = Songs;

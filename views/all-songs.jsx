var React = require("react");

class AllSongs extends React.Component {
  render() {
    const songsArr = this.props.songs;
    const songLinks = songsArr.map((song) => {
      return (
        <li key={song.id}>
          <a href={`/songs/${song.id}`}>{song.title}</a>
        </li>
      );
    });

    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/styles.css" />
        </head>
        <body>
          <a href="/">
            <button className="btn btn-primary">Back To Home</button>
          </a>
          <h1>All Songs</h1>
          <ol>{songLinks}</ol>
        </body>
      </html>
    );
  }
}

module.exports = AllSongs;

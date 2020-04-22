var React = require("react");

class NewPlaylist extends React.Component {
  render() {
    return (
      <html>
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </head>
        <body>
          <h1>Let's add a playlist!</h1>
          <h2>Name of playlist: </h2>
          <form method="POST" action="/playlists/new">
          <input type="text" name="playlist" />
          <button type="submit">Add</button>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = NewPlaylist;
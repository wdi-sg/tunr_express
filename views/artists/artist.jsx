var React = require("react");
var Layout = require('../layout/layout');

class Songs extends React.Component {
  render () {

    let songs = this.props.songs.map (song => {

      return (
        <li key={song.id}>
          <h2>{song.title}</h2>
          <p>Album: {song.album}</p>
          <p><a href={song.preview_link}>Preview</a></p>
        </li>
      )

    })

    return (
      <ol>
        {songs}
      </ol>
    )
  }
}

class Home extends React.Component {
  render() {

    let artist = this.props.artist;
    let songs = this.props.songs;

    return (
      <html>
        <head />
        <body>
          <Layout title="Index">
            <h1>{artist.name}</h1>
            <p>Nationality: {artist.nationality}</p>
            <Songs songs={songs} />
            </Layout>
        </body>
      </html>
    );
  }
}

module.exports = Home;

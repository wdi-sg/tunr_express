var React = require("react");
var Layout = require('../layout/layout');

class Songs extends React.Component {
  render () {

    let artist = this.props.artist;

    let songs = this.props.songs.map (song => {

      let url = `/artists/${artist.id}/songs/${song.id}`;

      return <li key={song.id}><a href={url}>{song.title}</a></li>
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

    let title = `Songs by ${artist.name}`;

    return (
      <html>
        <head />
        <body>
          <Layout title={title}>
            <h1>{artist.name}</h1>
            <Songs songs={songs} artist={artist} />
            </Layout>
        </body>
      </html>
    );
  }
}

module.exports = Home;

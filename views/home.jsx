var React = require("react");
var Layout = require('./layout/layout');

class Artists extends React.Component {
  render () {

    let artists = this.props.artists.map (artist => {

      let url = "/artists/" + artist.id;

      return (
        <li key={artist.id}><a href={url}>{artist.name}</a></li>
      )
    })

    return (
      <ol>
        {artists}
      </ol>
    )
  }
}

class Home extends React.Component {
  render() {

    return (
      <html>
        <head />
        <body>
          <Layout title="Artists">
            <h1>Artists</h1>
            <Artists artists={this.props.artists} />
            <p><a href="/artists/new">New Artist</a></p>
          </Layout>
        </body>
      </html>
    );
  }
}

module.exports = Home;

var React = require("react");
var Layout = require("./layout")

class Playlist extends React.Component {
  render() {

    const { name } = this.props.playlist[0]

    const songs = this.props.playlist.map((song, index)=>{
        return <li key = {index}>Title: {song.title}, Album: {song.album}</li>
    })


    return (
      <Layout>
          <h1>DISPLAYING PLAYLIST</h1>

          <h2>Playlist: {name}</h2>
          <h2>Songs:</h2>
          <ul>
          {songs}
          </ul>

       </Layout>
    );
  }
}

module.exports = Playlist;
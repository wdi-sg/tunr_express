var React = require("react");
var Layout = require("./layout");

class Songshow extends React.Component {
  render() {

    const theSongs = this.props.songs.map((song) => {
        return (
            <React.Fragment>
                <p>Title: {song.title}</p>
                <p>Album: {song.album}</p>
                <p>Preview: {song.preview_link}</p>
                <p>Artwork: {song.artwork}</p>
                <p>----------------------------------</p>
            </React.Fragment>
                );
    });

    return (
        <Layout>
          <h1>Artist Songs:</h1>
            <div>
                {theSongs}
            </div>
        </Layout>
    );
  }
}

module.exports = Songshow;
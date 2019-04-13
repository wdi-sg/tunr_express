var React = require("react");
var Layout = require("./layout");

class Playlistsongshow extends React.Component {
  render() {

    let playlistName = this.props.playlist[0].name;
    const thePlaylist = this.props.songlist.map((song) => {

        return (

            <div>
                <p>{song.title}</p>
                <p>----------------------------------</p>
            </div>
                );
    });

    return (
    <Layout>
          <h1>{playlistName}</h1>
            <div>
            <p>Songs: </p>
                {thePlaylist}
            </div>
    </Layout>
    );
  }
}

module.exports = Playlistsongshow;
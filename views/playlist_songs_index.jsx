var React = require("react");
var Layout = require("./layout");

class Playlistsongshow extends React.Component {
  render() {

    let playlistName = this.props.playlist[0].name;
    let actionAttribute = `/playlist/${this.props.songlist[0].playlist_id}`;

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
            </div><br/>

            <form method="POST" action={actionAttribute}>
                Add a song to this playlist: <br/>
                <input type="text" name="songs_id" placeholder="Song ID"/>
                <input type="submit" value="Add"/>
            </form>
    </Layout>
    );
  }
}

module.exports = Playlistsongshow;
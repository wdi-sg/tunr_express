var React = require("react");
var DefaultLayout = require("./layouts/default");

class AddToPlayList extends React.Component {
    render() {
      console.log(this.props.songs);
      const songList = this.props.songs.map(song => {
        return <option value={song.id}>{song.title} - {song.album}</option>
      });

      const playlistIndex = `/playlist/${this.props.playlistid}`;

        return (<DefaultLayout loggedIn={this.props.loggedIn}>
                    <h1>Add song to playlist</h1>
                    <form action={playlistIndex} method="POST">
                        <p>name:
                        <select name="songindex">
                            {songList}
                        </select>
                        </p>
                        <input type="submit" className="btn btn-primary"/>
                    </form>
                </DefaultLayout>);
    }
}

module.exports = AddToPlayList;

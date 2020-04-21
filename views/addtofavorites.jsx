var React = require("react");
var DefaultLayout = require("./layouts/default");

class AddToFavorites extends React.Component {
    render() {
      console.log(this.props.songs);
      const songList = this.props.songs.map(song => {
        return <option value={song.id}>{song.title} - {song.album}</option>
      });

      const playlistIndex = `/favorites`;

        return (<DefaultLayout loggedIn={this.props.loggedIn}>
                    <h1>Add song to favorites:</h1>
                    <form action={playlistIndex} method="POST">
                        <input type="hidden" name="userId" value={this.props.userId}/>
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

module.exports = AddToFavorites;

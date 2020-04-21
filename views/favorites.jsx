var React = require("react");
var DefaultLayout = require("./layouts/default");

class Favorites extends React.Component {
    render() {
        let songList;
        if (this.props.songs !== undefined && this.props.songs.length !== 0) {
            songList = this.props.songs.map(song => {
                return (<li><a href={song.preview_link}>{song.title}</a> - {song.album}</li>);
            });
        } else {
          songList = `Your favorites appears to be empty, why not add some songs?`;
        }

        return (<DefaultLayout loggedIn={this.props.loggedIn} title="Tunr">
            <h1>Your favorite songs. 😄</h1>
            <ul>{songList}</ul>
            <a href="/favorites/new" class="btn btn-primary">Add new favorite</a>
        </DefaultLayout>);
    }
}

module.exports = Favorites;

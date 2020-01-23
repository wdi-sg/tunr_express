var React = require("react");
var DefaultLayout = require("./layouts/default");

class Songs extends React.Component {
    render() {
        const playList = this.props.playList;
        let songList;
        if (this.props.songs !== undefined && this.props.songs.length !== 0) {
            songList = this.props.songs.map(song => {
                return (<li><a href={song.preview_link}>{song.title}</a> - {song.album}</li>);
            });
        } else {
          songList = `This playlist appears to be empty, why not add some songs?`;
        }

        return (<DefaultLayout loggedIn={this.props.loggedIn} title={playList.name}>
            <h1>{playList.name}</h1>
            <ul>{songList}</ul>
        </DefaultLayout>);
    }
}

module.exports = Songs;

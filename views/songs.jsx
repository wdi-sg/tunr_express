var React = require("react");
var DefaultLayout = require("./layouts/default");

class Songs extends React.Component {
    render() {
      const songList = this.props.songs.map(song => {
        return <li><a href={song.preview_link}>{song.title}</a> - {song.album}</li>
      });
        return (<DefaultLayout>
                <h1>{this.props.artist.name} Songs:</h1>
                <ul>{songList}</ul>
            </DefaultLayout>);
    }
}

module.exports = Songs;

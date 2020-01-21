var React = require("react");
var DefaultLayout = require("./layouts/default");

class Songs extends React.Component {
    render() {
      const songList = this.props.songs.map(song => {
        return <li><a href={song.preview_link}>{song.title}</a> - {song.album}</li>
      });
      const artistLink = `/artists/${this.props.artist.id}`;
        return (<DefaultLayout>
                <h1><a href={artistLink}>{this.props.artist.name}</a> Songs:</h1>
                <ul>{songList}</ul>
            </DefaultLayout>);
    }
}

module.exports = Songs;

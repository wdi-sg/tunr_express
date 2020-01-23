var React = require("react");
var DefaultLayout = require("./layouts/default");

class Playlists extends React.Component {
    render() {
      const playListList = this.props.playlists.map(playlist => {
        const playlistLink = `/playlist/${playlist.id}`;
        return <li><a href={playlistLink}>{playlist.name}</a></li>
      });
        return (<DefaultLayout loggedIn={this.props.loggedIn} title="Playlists">
                <h1>Playlists:</h1>
                <ul>{playListList}</ul>
            </DefaultLayout>);
    }
}

module.exports = Playlists;

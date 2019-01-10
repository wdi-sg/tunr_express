var React = require('react');
var Default = require('./default')

class ArtistSongs extends React.Component {
    render() {
        let songs = this.props.songs.map(song => {
            let playlistLink = '/songs/' + song.id + '/add';
            return (
                <tr key={song.title}>
                    <td><a href={song.preview_link}>{song.title}</a></td>
                    <td>{song.album}</td>
                    <td><img src={song.artwork}/></td>
                    <td><a href={playlistLink}><img src='https://static.thenounproject.com/png/1310911-200.png'/></a></td>
                </tr>
            )
        });
        return (
            <Default>
                <form method="GET" action ={'/artists/' + this.props.id + '/songs/new'}>
                    <input type="submit" value="Add Song"/>
                </form>
                <table>
                    <tr>
                        <td>Title</td>
                        <td>Album</td>
                        <td>Artwork</td>
                        <td>Add To Playlist</td>
                    </tr>
                    {songs}
                </table>
            </Default>
        );
    }
}

module.exports = ArtistSongs;

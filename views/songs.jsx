var React = require('react');
var Default = require('./default')

class Songs extends React.Component {
    render() {
        let songs = this.props.songs.map(song => {
            return (
                <tr key={song.title}>
                    <td><a href={song.preview_link}>{song.title}</a></td>
                    <td>{song.album}</td>
                    <td><img src={song.artwork}/></td>
                </tr>
            )
        });
        return (
            <Default>
                <table>
                    <tr>
                        <td>Title</td>
                        <td>Album</td>
                        <td>Artwork</td>
                    </tr>
                    {songs}
                </table>
            </Default>
        );
    }
}

module.exports = Songs;

var React = require('react');
var Default = require('./default')

class Playlist extends React.Component {
    render() {
        let playlist = this.props.playlist.map(playlist => {
            return (
                <tr key={playlist.name}>
                    <td>{playlist.id}</td>
                    <td>{playlist.name}</td>
                </tr>
            )
        });
        return (
            <Default>
                <table>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                    </tr>
                    {playlist}
                </table>
            </Default>
        );
    }
}

module.exports = Playlist;

var React = require('react');
var Default = require('./default')

class PlaylistAdd extends React.Component {
    render() {
        let playlist = this.props.playlist.map(playlist => {
            return (
                <option key={playlist.name} value={playlist.id}>
                    {playlist.name}
                </option>
            )
        });
        let action = '/playlist/add/' + this.props.songID
        return (
            <Default>
                <h3>Select playlist to add song to:</h3>
                <form method='POST' action={action}>
                    <select name='playlistID'>
                        {playlist}
                    </select>
                    <input type='submit' value='Submit'/>
                </form>
            </Default>
        );
    }
}

module.exports = PlaylistAdd;

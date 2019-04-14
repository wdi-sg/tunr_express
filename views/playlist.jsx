var React = require('react');


class Playlist extends React.Component {
    render() {
        const list = this.props.playlist.map(playlist => {
            return (
                <div>
                <tbody>
                    <tr>
                        <td>{playlist.id}</td>
                        <td>{playlist.name}</td>
                    </tr>
                  </tbody>
                </div>
                )
            });
        return (
                <body>
                <h3>Amazeball Playlists!!: </h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Playlist ID</th>
                                <th>Playlist Name</th>
                            </tr>
                    </thead>
                    {list}
                    </table>
                </body>
            );
        }
    }


module.exports = Playlist
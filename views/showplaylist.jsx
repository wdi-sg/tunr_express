var React = require('react');


class ShowPlayList extends React.Component {
    render() {
        const playlist = this.props.playlists.map(playlist => {
            return (
                <div>
                  {playlist.name}
                </div>
                )
            });
        return (
                <body>
                    <h3>Your playlists: </h3>
                    <div>
                      {playlist}
                    </div>
                </body>
            );
        }
    }


module.exports = ShowPlayList
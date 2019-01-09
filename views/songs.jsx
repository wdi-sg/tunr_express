var React = require('react');
var Default = require('./default')

class Songs extends React.Component {
    render() {
        let songs = this.props.songs.map(song => {
            let songLink = '/songs/' + song.id;
            return (
                <div key={song.id}>
                    <a href={songLink} >
                        <p>{song.id}. {song.title} [{song.album}]</p>
                        <p>{song.preview_link}</p>
                        <p>{song.artwork}</p>
                        <p>Artist ID: {song.artist_id}</p>
                    </a>
                    <br/>
                </div>
            )
        })
        return (
            <Default>
                {songs}
            </Default>
        );
    }
}

module.exports = Songs;

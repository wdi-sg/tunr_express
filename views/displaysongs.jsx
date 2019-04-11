var React = require('react');

class Displaysongs extends React.Component {
    render() {
        const songs = this.props.songs.map(song => {
            return (
                <div>
                  {song.title}
                </div>
                )
            });
        return(
            <body>
              <div>
                <h3>Songs for the artist that you selected</h3>
                  {songs}
              </div>
            </body>
        )

    }
}

module.exports = Displaysongs;
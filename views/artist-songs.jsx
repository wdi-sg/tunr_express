var React = require("react");

class ArtistSongs extends React.Component {
  render() {
    const artist = this.props.artist;
    const songs = this.props.songs;

    const songList = songs.map(song => {
        return (
            <li>{song.title}</li>
            );
    });
    console.log(songList)

    return (
        <html>
            <head />
            <body>
                <h3>Songs from {artist.name}...</h3>
                <ul>
                {songList}
                </ul>
            </body>
        </html>
    );
  }
}

module.exports = ArtistSongs;
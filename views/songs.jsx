var React = require("react");

class Songs extends React.Component {
    render() {
      const songList = this.props.songs.map(song => {
        console.log(song);
        return <li>{song.title} - {song.album}</li>
      });
        return (<html>
            <head/>
            <body>
                <h1>Songs:</h1>
                <ul>{songList}</ul>
            </body>
        </html>);
    }
}

module.exports = Songs;

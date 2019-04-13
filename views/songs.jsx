var React = require("react");

class Songs extends React.Component {
  render() {
    const songs= this.props.songs.map((song) => {
        return (
            <div>
            <tr>
                <th>{song.id}</th>
                <th>{song.artist_id}</th>
                <th>{song.title}</th>
                <th>{song.album}</th>
                <th><a href={song.preview_link}>Listen</a></th>
                <th><img width="100px" height="100px" src={song.artwork}/></th>
            </tr>
            </div>
        )
})
    return (
        <html>
            <head>
                <title>TUNR TABLE</title>
            </head>
            <body>
                <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ARTIST ID</th>
                            <th>TITLE</th>
                            <th>ALBUM</th>
                            <th>PREVIEW</th>
                            <th>ARTWORK</th>
                        </tr>
                    </thead>
                    {songs}
                </table>
                </div>
            </body>
        </html>
        );
    }
}

module.exports = Songs;
var React = require("react");

class Artists extends React.Component {
  render() {
    const artists = this.props.artists.map((artist) => {
        return (
            <tr>
                <th>{artist.id}</th>
                <th>{artist.name}</th>
                <th><img width="100px" height="100px" src={artist.photo_url}/></th>
                <th>{artist.nationality}</th>
            </tr>
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
                            <th>NAME</th>
                            <th>PHOTO</th>
                            <th>NATIONALITY</th>
                        </tr>
                    </thead>
                    {artists}
                </table>
                </div>
            </body>
        </html>
        );
    }
}

module.exports = Artists;

// Welcome to Music that will TUNR YOU!
var React = require("react");

console.log('r');
// console.log(this.props.artist);

class Artists extends React.Component {
    render() {

        console.log("Artists List Page Accessed");
        console.log("------------------");

        var artists = this.props.rows;
        var output = artists.map(artist => {
            return <li>
                <p>Artists Name: {artist.name}</p>
                <p><img src={artist.photo_url} /></p>
                <p>Artists Nationality: {artist.nationality}</p>
            </li>
        });

        return (
            <html>
                <head />
                <body>
                    <h1>Welcome to Artists!</h1>
                    <ol>
                        {output}
                    </ol>
                </body>
            </html>
        );
    }
}

module.exports = Artists;

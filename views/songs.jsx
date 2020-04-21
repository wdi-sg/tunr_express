var React = require("react");

console.log("Artists Songs List Page Accessed");
console.log("------------------");

class Artists extends React.Component {
    render() {

        var artists = this.props.rows;
        var artistName = artists[0].name;
        var output = artists.map(artist => {
            return <li>
                <p>Song Name: {artist.title}</p>
                <p>Album Name: {artist.album}</p>
            </li>
        });

        return (
            <html>
                <head />
                <body>
                    <h1>Welcome to {artistName} Songs List!</h1>
                    <ol>
                        {output}
                    </ol>
                </body>
            </html>
        );
    }
}

module.exports = Artists;

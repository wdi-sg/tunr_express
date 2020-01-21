var React = require("react");

class Artists extends React.Component {
    render() {
      const artistList = this.props.artists.map(artist => {
        const artistLink = `/artists/${artist.id}`;
        return <li><a href={artistLink}>{artist.name}</a> - <img src={artist.photo_url} width="128"/> - {artist.nationality}</li>
      });
        return (<html>
            <head/>
            <body>
                <h1>Artists:</h1>
                <ul>{artistList}</ul>
            </body>
        </html>);
    }
}

module.exports = Artists;

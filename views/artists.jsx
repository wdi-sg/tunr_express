var React = require("react");
var DefaultLayout = require("./layouts/default");

class Artists extends React.Component {
    render() {
      const artistList = this.props.artists.map(artist => {
        const artistLink = `/artists/${artist.id}`;
        return <li><a href={artistLink}>{artist.name}</a> - <img src={artist.photo_url} width="128"/> - {artist.nationality}</li>
      });
        return (
            <DefaultLayout title="Tunr">
                <h1>Tunr Music</h1>
                <h3>Artists:</h3>
                <ul>{artistList}</ul>
            </DefaultLayout>);
    }
}

module.exports = Artists;

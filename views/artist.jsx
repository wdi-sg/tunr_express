var React = require("react");
var DefaultLayout = require("./layouts/default");

class Artist extends React.Component {

    render() {
        const artist = this.props.artist;
        const editLink = `/artists/${artist.id}/edit`;
        return (
          <DefaultLayout title={artist.name}>
            <h1>{artist.name}</h1>
            <h3>{this.props.message}</h3>
            <img src={artist.photo_url} width="250px"/>
            <h3>This artist is from {artist.nationality}</h3>
            <a href={editLink} class="btn btn-primary">Edit this artist entry</a>
        </DefaultLayout>);
    }
}

module.exports = Artist;

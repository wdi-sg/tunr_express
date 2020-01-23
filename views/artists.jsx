var React = require("react");
var DefaultLayout = require("./layouts/default");

class Artists extends React.Component {
    render() {
        const artistList = this.props.artists.map(artist => {
            const artistLink = `/artists/${artist.id}`;
            return (<div className="card" style={{width: 18 + 'rem', display: 'inline-block', margin: 1 + 'em'}}>
                <img src={artist.photo_url} className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">{artist.name}</h5>
                        <p className="card-text">This artist is from {artist.nationality}</p>
                        <a href={artistLink} className="btn btn-primary">See more about {artist.name}</a>
                    </div>
                </div>) });

              return (
                <DefaultLayout title="Tunr" loggedIn={this.props.loggedIn}>
                    <h1>Tunr Music</h1>
                    <h3>Artists:</h3>
                    <ul>{artistList}</ul>
                </DefaultLayout>);
    }
}

module.exports = Artists;

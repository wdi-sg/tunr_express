const React = require("react");

class AllArtists extends React.Component {

    render() {

        const artistInfo = this.props.allArtists.map(artist =>
            <div className="single-artist__container">
                <div className="single-artist__img-container">
                    <img src={artist["photo_url"]} alt={artist.name} className="single-artist__img"/>
                </div>
                <p className="single-artist__name">{artist.name}</p>
                <p className="single-artist__nationality">{artist.nationality}</p>
            </div>
        )

        return (
            <html>
            <head />
            <body>
                {artistInfo}
            </body>
            </html>
        );
    }
}

module.exports = AllArtists;
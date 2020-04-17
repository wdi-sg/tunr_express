const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AllArtists extends React.Component {

    render() {

        const artistInfo = this.props.allArtists.map(artist =>

            <div className="single-artist__container" key={artist.id}>
                <div className="single-artist__img-container">
                    <img src={artist["photo_url"]} alt={artist.name} className="single-artist__img"/>
                </div>
                <a href={`./${artist.id}`} className="single-artist__name">{artist.name}</a>
                <p className="single-artist__nationality">{artist.nationality}</p>
            </div>
        )



        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <div className="nav">
                        <a href="/artists/new" className="nav__link add-artist">Add Artist</a>
                        <a href="/" className="nav__link home-link">Back to Home</a>
                    </div>
                    <main>
                        {artistInfo}
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AllArtists;
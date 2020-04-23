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
                        <div className="overlay"></div>
                        <a href="/" className="nav__link home-link"><p>Home</p></a>
                        <a href="/artists/new" className="nav__link add-artist"><p>Add Artist</p></a>
                        <a href="/playlists" className="nav__link add-artist"><p>Playlists</p></a>
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
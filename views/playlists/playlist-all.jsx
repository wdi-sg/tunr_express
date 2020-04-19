const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AllPlaylists extends React.Component {

    render() {

        const playlistInfo = this.props.allPlaylists.map(playlist =>

            <div className="single-playlist__container" key={playlist.id}>
                <div className="single-playlist__img-container">
                    <img src={playlist["photo_url"]} alt={playlist.name} className="single-playlist__img"/>
                </div>
                <a href={`./${playlist.id}`} className="single-playlist__name">{playlist.name}</a>
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
                        <a href="/playlists/new" className="nav__link add-playlist"><p>Add Playlist</p></a>
                        <a href="/" className="nav__link add-playlist"><p>Playlists</p></a>
                    </div>
                    <main>
                        {playlistInfo}
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AllPlaylists;
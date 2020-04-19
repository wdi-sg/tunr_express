const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class SinglePlaylist extends React.Component {

    render() {

        const playlistSongs = this.props.singlePlaylist.map(song => {
            console.log(song);
            return (
                <div className="single-song__container single-display">
                    <div className="single-song__img-container single-display">
                        <img src={`http://a3.mzstatic.com/us/r30/Features/d6/ba/99/dj.homcvzwl.60x60-50.jpg`} alt={song.title} className="single-song__img"/>
                    </div>
                    <p className="single-song__title">{song.title}</p>
                    <p className="single-song__album">{song.album}</p>
                    <a href={song['preview_link']}>Preview</a>
                </div>
            )
        })

        return (
            <html>
                <Head />

                <body>
                    <Header />
                    <div className="nav">
                        <div className="overlay"></div>
                        <a href="/" className="nav__link home-link"><p>Home</p></a>
                        <a href="/playlists/" className="nav__link show-all-playlists"><p>All Playlists</p></a>
                    </div>
                    <main>
                        <div className="single-playlist__container single-display">
                                {playlistSongs}
                                <a href="./edit" className="playlist__edit-link"><p>Edit</p></a>
                                <a href="./delete" className="playlist__delete-link"><p>Delete Playlist</p></a>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = SinglePlaylist;
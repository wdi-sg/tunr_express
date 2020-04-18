const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AllSongs extends React.Component {

    render() {

        const songInfo = this.props.allSongs.map(song =>

            <div className="single-song__container" key={song.id}>
                <div className="single-song__img-container">
                    <img src={song.artwork} alt={song.album} className="single-song__img"/>
                </div>
                <a href={`./${song.id}`} className="single-song__title">{song.name}</a>
                <p className="single-song__album">{song.album}</p>
            </div>
        )



        return (
            <html>
                <div className="overlay"></div>
                <Head />
                <body>
                    <Header />
                    <div className="nav">
                        <a href="/" className="nav__link home-link"><p>Home</p></a>
                        <a href="/artists/new" className="nav__link add-artist"><p>Add Artist</p></a>
                    </div>
                    <main>
                        {songInfo}
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AllSongs;
const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AllSongs extends React.Component {

    render() {

        console.log(this.props.allSongs[0]);

        const songInfo = this.props.allSongs.map(song =>

            <div className="single-song__container" key={song.id}>
                <div className="single-song__img-container">
                    <img src={song.artwork} alt={song.album} className="single-song__img"/>
                </div>
                <a href={`./${this.props.allSongs.indexOf(song)}`} className="single-song__title">{song.title}</a>
                <p className="single-song__album">{song.album}</p>
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
                        <a href="./add" className="nav__link add-artist"><p>Add Song</p></a>
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
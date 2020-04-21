const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AllSongs extends React.Component {

    render() {

        const displayFavouriteButton = (song) => {
            if (this.props.currentUser) {
                return (
                    <form method="POST" type="hidden" action={`/favourites/delete?_method=delete`}>
                    <input name="songId" type="hidden" defaultValue={song.id} />
                    <button className="single-song__favourite-btn">Remove From Favourites</button>
                    </form>
                )

            } else {
                return;
            }

        }

        const displaySongInfo = () => {

            if (this.props.favouriteSongs) {
                return this.props.favouriteSongs
                    .map(song =>

                        <div className="single-song__container" key={song.id}>
                            <div className="single-song__img-container">
                                <img src={song.artwork} alt={song.album} className="single-song__img"/>
                            </div>
                            <a href={`./${this.props.favouriteSongs.indexOf(song)}`} className="single-song__title">{song.title}</a>
                            <p className="single-song__album">{song.album}</p>
                            {displayFavouriteButton(song)}
                        </div>
                    )

            } else {
                return;
            }

        }


        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <div className="nav">
                        <div className="overlay"></div>
                        <a href="/" className="nav__link home-link"><p>Home</p></a>
                    </div>
                    <main>
                        <h2>Favourites</h2>
                        <h4>{`User: ${this.props.currentUser.email}`}</h4>
                        {displaySongInfo()}
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AllSongs;
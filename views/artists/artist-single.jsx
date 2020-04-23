const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class SingleArtist extends React.Component {

    render() {

        return (
            <html>
                <Head />

                <body>
                    <Header />
                    <main>
                        <div className="nav">
                            <div className="overlay"></div>
                            <a href="/" className="nav__link home-link"><p>Home</p></a>
                            <a href="/artists/" className="nav__link show-all-artists"><p>All Artists</p></a>
                        </div>
                        <div className="single-artist__container single-display">
                            <div className="single-artist__img-container single-display">
                                <img src={this.props.singleArtist["photo_url"]} alt={this.props.singleArtist.name} className="single-artist__img single-display"/>
                            </div>
                            <p className="single-artist__name">{this.props.singleArtist.name}</p>
                            <p className="single-artist__nationality">{this.props.singleArtist.nationality}</p>
                            <a className="single-artist__songs-link" href="./songs"><p>See Discography</p></a>
                            <div className ="artist__edit-delete-links">
                                <a href="./edit" className="artist__edit-link"><p>Edit</p></a>
                                <a href="./delete" className="artist__delete-link"><p>Delete Artist</p></a>
                            </div>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = SingleArtist;
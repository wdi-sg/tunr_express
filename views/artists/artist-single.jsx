const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class SingleArtist extends React.Component {

    render() {

        return (
            <html>
                <Head />
                <div className="overlay"></div>
                <body>
                    <Header />
                    <main>
                        <div className="banner">
                            <a href="/" className="nav__link home-link"><p>Home</p></a>
                            <a href="/artists/" className="nav__link show-all-artists"><p>All Artists</p></a>
                        </div>
                        <div className="single-artist__container">
                            <div className="single-artist__img-container">
                                <img src={this.props.singleArtist["photo_url"]} alt={this.props.singleArtist.name} className="single-artist__img"/>
                            </div>
                            <p className="single-artist__name">{this.props.singleArtist.name}</p>
                            <p className="single-artist__nationality">{this.props.singleArtist.nationality}</p>
                            <div className ="artist__edit-delete-links">
                                <a href="./edit" className="recipe__edit-link">Edit</a>
                                <a href="./delete" className="recipe__delete-link">Delete Artist</a>
                            </div>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = SingleArtist;
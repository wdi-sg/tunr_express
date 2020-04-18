const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class ArtistDeleted extends React.Component {
    render() {
        return (
            <html>
                <div className="overlay"></div>
                <Head />
                <body>
                    <Header />
                    <div className="banner">
                        <a href="/" className="nav__link home-link"><p>Home</p></a>
                        <a href="/artists/" className="nav__link show-all-artists"><p>All Artists</p></a>
                    </div>
                    <main>
                        <h1>Artist Deleted!</h1>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = ArtistDeleted;
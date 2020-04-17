const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class ArtistDeleted extends React.Component {
    render() {
        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <div className="banner">
                        <div className="nav">
                            <a href="/artists/new" className="nav__link add-artist">Add Artist</a>
                            <a href="/artists/" className="nav__link show-all-artists">Show All Artists</a>
                        </div>
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
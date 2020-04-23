const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class SongDeleted extends React.Component {
    render() {
        return (
            <html>
                <Head />
                <body>
                    <Header />
                    <div className="nav">
                        <div className="overlay"></div>
                        <a href="/" className="nav__link home-link"><p>Home</p></a>
                        <a href="/artists/" className="nav__link show-all-artists"><p>All Artists</p></a>
                    </div>
                    <main>
                        <div className="form__wrapper">
                            <h1 className="delete__header">Song Deleted!</h1>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = SongDeleted;
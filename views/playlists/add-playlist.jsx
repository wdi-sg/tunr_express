const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AddPlaylistForm extends React.Component {

    render() {

        return (
            <html>
                <div className="overlay"></div>
                <Head />
                <script defer src="scripts/add-form.js" />
                <body>
                    <Header />
                    <div className="nav">
                        <a href="/" className="nav__link home-link"><p>Home</p></a>
                        <a href="/playlists/" className="nav__link show-all-playlists"><p>All Playlists</p></a>
                    </div>
                    <main>
                        <form method="POST" action={`/playlists`} className="add-form">
                            <h2 className="add-form__header">Add New Playlist</h2>
                            <input type="text" name="name" placeholder="Name" maxLength="25" />
                            <input type="text" name="" placeholder="" />
                            <input type="text" name="" placeholder="" />
                            <button className="add-form__submit-btn" type="submit">Add</button>
                        </form>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AddPlaylistForm;
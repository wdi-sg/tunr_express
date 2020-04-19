const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class EditPlaylistForm extends React.Component {

    render() {

        return (
            <html>
                <Head />
                <script defer src="scripts/edit-form.js" />
                <body>
                    <Header />
                    <main>
                        <div className="nav">
                            <div className="overlay"></div>
                            <a href="/" className="nav__link home-link"><p>Home</p></a>
                            <a href="/playlists/" className="nav__link show-all-playlists"><p>All Playlists</p></a>
                        </div>
                        <form method="POST" action={`/playlists/${this.props.singlePlaylist.id}?_method=put`} className="edit-form">
                            <h2 className="edit-form__header">Edit Playlist Information</h2>
                            <input type="text" name="" placeholder="" maxLength="25" defaultValue={this.props.singlePlaylist.name} />
                            <input type="text" name="" placeholder="" defaultValue={this.props.singlePlaylist} />
                            <input type="text" name="" placeholder="" defaultValue={this.props.singlePlaylist} />

                            <button className="edit-form__submit-btn" type="submit">Edit</button>
                        </form>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = EditPlaylistForm;
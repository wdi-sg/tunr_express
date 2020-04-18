const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AddSongForm extends React.Component {

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
                        <a href="/artists/" className="nav__link show-all-artists"><p>All Artists</p></a>
                    </div>
                    <main>
                        <form method="POST" action={`/artists/${this.props.artist.id}/songs`} className="add-form">
                            <h2 className="add-form__header">Add New Song</h2>
                            <input type="text" name="title" placeholder="Title" maxLength="25" />
                            <input type="text" name="album" placeholder="Album" />
                            <input type="text" name="preview link" placeholder="Preview Link" />
                            <input type="text" name="artwork" placeholder="Artwork" />
                            <button className="add-form__submit-btn" type="submit">Add</button>
                        </form>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AddSongForm;
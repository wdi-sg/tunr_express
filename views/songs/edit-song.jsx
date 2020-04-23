const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class EditSongForm extends React.Component {

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
                            <a href="/artists/" className="nav__link show-all-artists"><p>All Artists</p></a>
                        </div>
                        <div className="form__wrapper">
                            <form method="POST" action={`/artists/${this.props.artist.id}/songs/${this.props.singleSong.position}?_method=put`} className="edit-form">
                                <h2 className="edit-form__header">Edit Song</h2>
                                <p className="edit-form__header-label">Title</p>
                                <input type="text" name="title" placeholder="Title" maxLength="25" defaultValue={`${this.props.singleSong.title}`}/>
                                <p className="edit-form__header-label">Album</p>
                                <input type="text" name="album" placeholder="Album" defaultValue={`${this.props.singleSong.album}`}/>
                                <p className="edit-form__header-label">Preview Link</p>
                                <input type="text" name="preview link" placeholder="Preview Link" defaultValue={`${this.props.singleSong['preview_link']}`} />
                                <p className="edit-form__header-label">Artwork Link</p>
                                <input type="text" name="artwork" placeholder="Artwork Link" defaultValue={`${this.props.singleSong.artwork}`} />
                                <button className="edit-form__submit-btn" type="submit">Edit</button>

                            </form>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = EditSongForm;
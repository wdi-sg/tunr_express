const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AddArtistForm extends React.Component {

    render() {

        return (
            <html>
                <Head />
                <script defer src="scripts/add-form.js" />
                <body>
                    <Header />
                    <div className="nav">
                        <a href="/" className="nav__link home-link">Back to Home</a>
                        <a href="/artists/" className="nav__link show-all-artists">Show All Artists</a>
                    </div>
                    <main>
                        <form method="POST" action={`/artists`} className="add-form">
                            <h2 className="add-form__header">Add New Artist</h2>
                            <input type="text" name="name" placeholder="Name" maxLength="25" />
                            <input type="text" name="nationality" placeholder="Nationality" />
                            <input type="text" name="image link" placeholder="Image Link" />
                            <button className="add-form__submit-btn" type="submit">Edit</button>
                        </form>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AddArtistForm;
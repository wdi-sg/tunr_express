const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AddArtistForm extends React.Component {

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
                        <div className="form__wrapper">
                            <form method="POST" action={`/artists`} className="add-form">
                                <h2 className="add-form__header">New Artist</h2>
                                <input type="text" name="name" placeholder="Name" maxLength="25" />
                                <input type="text" name="nationality" placeholder="Nationality" />
                                <input type="text" name="image link" placeholder="Image Link" />
                                <button className="add-form__submit-btn" type="submit">Add</button>
                            </form>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = AddArtistForm;
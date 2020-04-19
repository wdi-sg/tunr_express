const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class EditArtistForm extends React.Component {

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
                        <form method="POST" action={`/artists/${this.props.singleArtist.id}?_method=put`} className="edit-form">
                            <h2 className="edit-form__header">Edit Artist Information</h2>
                            <input type="text" name="name" placeholder="Name" maxLength="25" defaultValue={this.props.singleArtist.name} />
                            <input type="text" name="nationality" placeholder="Nationality" defaultValue={this.props.singleArtist.nationality} />
                            <input type="text" name="image link" placeholder="Image Link" defaultValue={this.props.singleArtist["photo_url"]} />

                            <button className="edit-form__submit-btn" type="submit">Edit</button>
                        </form>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = EditArtistForm;
const React = require("react");

import Head from '../page-components/head-component';

class AddArtistForm extends React.Component {

    render() {

        return (
            <html>
            <Head />
            <body>
            <form method="POST" action={`/artists`} className="add-form">
                <h2 className="add-form__header">Add New Artist</h2>
                <input type="text" name="name" placeholder="Name" maxLength="25" />
                <input type="text" name="nationality" placeholder="Nationality" />
                <input type="text" name="image link" placeholder="Image Link" />
                <button className="add-form__submit-btn" type="submit">Edit</button>
            </form>
            </body>
            </html>
        );
    }
}

module.exports = AddArtistForm;
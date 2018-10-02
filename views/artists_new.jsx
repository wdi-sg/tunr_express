

var React = require('react');

class ArtistsNew extends React.Component {

    render() {

        return (

            <div>

                <a href='/artists'>{'<< '}Back to Artists</a>

                <h1>New Artist</h1>

                <form method="POST" action="/artists/new">

                Name: <input type="text" name="name" minlength="2" required /><br />
                Nationality: <input type="text" name="nationality" minlength="2" /><br />
                Artist Image URL: <input type="text" name="photo_url" value="http://" minlength="3" /><br />

                <input type="submit" value="Submit" />

                </form>

            </div>

        );
    };
};


module.exports = ArtistsNew;
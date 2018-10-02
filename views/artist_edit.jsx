

var React = require('react');

class ArtistEdit extends React.Component {

    render() {

        console.log ( "Rendering Edit Artist: ", this.props.artist );

        let artist = this.props.artist[0]

        return (

            <div>

                <a href={`/artists/${artist.id}`}>{'<< '}Back to {artist.name}</a>

                <h1>Edit Artist</h1>

                <form method="POST" action={`/artists/${artist.id}?_method=PUT`}>

                Name: <input type="text" name="name" value={artist.name} minlength="2" required /><br />
                Nationality: <input type="text" name="nationality" value={artist.nationality} minlength="2" /><br />
                Artist Image URL: <input type="text" name="photo_url" value={artist.photo_url} minlength="3" /><br />

                <input type="submit" value="Submit" />

                </form>

            </div>

        );
    };
};


module.exports = ArtistEdit;
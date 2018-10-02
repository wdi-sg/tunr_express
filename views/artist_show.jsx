

var React = require('react');

class ArtistShow extends React.Component {

    render() {

        console.log ( "Rendering Show Artist: ", this.props.artist );

        let artist = this.props.artist[0]


        return (

            <div>

                <a href='/artists'>{'<< '}Back to Artists</a>

                <h1>{artist.name}</h1>

                <a href={`/artists/${artist.id}/edit`}>(Edit)</a>

                <h3>{artist.nationality}</h3>

                <img src={`${artist.photo_url}`} />


                <form method="POST" action={`/artists/${artist.id}?_method=DELETE`} onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" value={artist.id} /><br />
                    <input type="submit" value="Delete this Artist" />
                </form>

            </div>

        );
    };
};


module.exports = ArtistShow;
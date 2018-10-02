

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

            </div>

        );
    };
};


module.exports = ArtistShow;
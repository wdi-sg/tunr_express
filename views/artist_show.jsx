

var React = require('react');

class ArtistShow extends React.Component {

    render() {

        console.log ( "INSIDE REACT ARTISTS INDEX: ", this.props.artist );

        let artist = this.props.artist[0]


        return (

            <div>

                <a href='/artists'>{'<< '}Back to Artists</a>

                <h1>{artist.name}</h1>
                <h3>{artist.nationality}</h3>
                <img src={`${artist.photo_url}`} />

            </div>

        );
    };
};


module.exports = ArtistShow;
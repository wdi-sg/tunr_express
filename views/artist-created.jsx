var React = require ('react');
var DefaultLayout = require ('./default')

class ArtistCreated extends React.Component {
    render() {
        const artist = this.props.new;
        const link = `${artist.photo_url}`;

        return(
            <DefaultLayout>
                <h1>Artist Successfully Created!</h1>
                    <div>
                        <h3> Artist Name: {artist.name} </h3>
                        <img src={link} alt="artist photo"/>
                        <h3> Nationality: {artist.nationality} </h3>
                    </div>
            </DefaultLayout>
        )
    }
}

module.exports = ArtistCreated;
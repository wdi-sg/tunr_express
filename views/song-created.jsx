var React = require ('react');
var DefaultLayout = require ('./default')

class ArtistCreated extends React.Component {
    render() {
        const song = this.props.new;
        const previewLink = `${song.preview_link}`;
        const artworkLink = `${song.artwork}`;

        return(
            <DefaultLayout>
                <h1>Artist Successfully Created!</h1>
                    <div>
                        <h3> Artis Id: {song.id} </h3>
                        <h3> Artist Name: {song.name} </h3>
                        <h3> Album Name: {song.album} </h3>
                        <img src={previewLink} alt="song-preview"/>
                        <img src={artworkLink} alt="song-artwork"/>
                    </div>
            </DefaultLayout>
        )
    }
}

module.exports = ArtistCreated;
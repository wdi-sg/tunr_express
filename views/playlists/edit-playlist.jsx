const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class EditPlaylistForm extends React.Component {

    render() {

        const artistOptions = this.props.artists.map(artist => <option value={artist.name} artist-id={artist.id}>{artist.name}</option>)

        const songsOptions = this.props.songs.map(song => <option value={song.title} className="song-options" artistid={song['artist_id']}artist={this.props.artists.find(artist => artist.id == song['artist_id']).name}>{song.title}</option>)


        const playlistSongs = this.props.playlistSongs.map(song => {
            return (
                <div className="edit-form__song-container">
                    <h5>Artist: </h5>
                    <input type="text" name="[artist]" defaultValue={this.props.artists.find(artist => artist.id == song['artist_id']).name}></input>
                    <h5>Song:</h5>
                    <input type="text" name="[song]" defaultValue={song.title}></input>
                </div>
            )
        })


        return (
            <html>
                <Head />
                <script defer src="scripts/edit-form.js" />
                <script defer src="scripts/edit-playlist-form.js" />
                <body>
                    <Header />
                    <main>
                        <div className="nav">
                            <div className="overlay"></div>
                            <a href="/" className="nav__link home-link"><p>Home</p></a>
                            <a href="/playlists/" className="nav__link show-all-playlists"><p>All Playlists</p></a>
                        </div>
                        <div className="form__wrapper">
                        <form method="POST" action={`/playlists/${this.props.singlePlaylist.id}?_method=put`} className="edit-form">
                            <h2 className="edit-form__header">Edit Playlist</h2>
                            <input type="text" name="name" maxLength="25" defaultValue={this.props.singlePlaylist.name} />
                            <select id="artists-select" name="artists">
                                {artistOptions}
                            </select>
                            <select id="songs-select" name="songs">
                                {songsOptions}
                            </select>
                            <div className="form__btn-wrapper">
                                <button className="edit-form__add-song-btn" type="button">Add Song</button>
                                <button className="edit-form__delete-song-btn" type="button">Delete Song</button>
                            </div>
                            {playlistSongs}
                            <button className="edit-form__submit-btn" type="submit">Edit</button>
                        </form>
                        </div>
                    </main>
                </body>
            </html>
        );
    }
}

module.exports = EditPlaylistForm;
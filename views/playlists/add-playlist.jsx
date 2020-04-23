const React = require("react");

import Head from '../page-components/head-component';
import Header from '../page-components/header-component';

class AddPlaylistForm extends React.Component {

    render() {

        const artistOptions = this.props.artists.map(artist => <option value={artist.name} artist-id={artist.id}>{artist.name}</option>)

        const songsOptions = this.props.songs.map(song => <option value={song.title} className="song-options" artistid={song['artist_id']}artist={this.props.artists.find(artist => artist.id == song['artist_id']).name}>{song.title}</option>)

        return (

            <html>
                    <div className="overlay"></div>
                    <Head />
                    <script defer src="scripts/add-form.js" />
                    <script defer src="scripts/add-playlist-form.js" />
                    <body>
                        <Header />
                        <div className="nav">
                            <a href="/" className="nav__link home-link"><p>Home</p></a>
                            <a href="/playlists/" className="nav__link show-all-playlists"><p>All Playlists</p></a>
                        </div>
                        <main>
                            <div className="form__wrapper">
                                <form method="POST" action={`/playlists`} className="add-form">
                                    <h2 className="add-form__header">Create New Playlist</h2>
                                    <input type="text" name="playlist_name" placeholder="Playlist Name"></input>
                                    <select id="artists-select" name="artists">
                                        {artistOptions}
                                    </select>
                                    <select id="songs-select" name="songs">
                                        {songsOptions}
                                    </select>
                                    <div className="form__btn-wrapper">
                                        <button className="add-form__add-song-btn" type="button">Add Song</button>
                                        <button className="add-form__delete-song-btn" type="button">Delete Song</button>
                                    </div>
                                    <button className="add-form__submit-btn add-playlist-btn" type="submit">Add Playlist</button>
                                </form>
                            </div>
                        </main>
                    </body>
                </html>
        );
    }
}

module.exports = AddPlaylistForm;
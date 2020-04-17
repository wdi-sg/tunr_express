const React = require('react');

const nav = () => {
    return (
        <div className="nav">
            <a href="/artists/new" className="nav__link add-artist">Add Artist</a>
            <a href="/artists/" className="nav__link show-all-artists">Show All Artists</a>
        </div>
    )
}

export default nav;
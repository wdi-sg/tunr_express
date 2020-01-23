var React = require("react");

class NavBar extends React.Component {
    render() {
        return (<nav className="navbar navbar-light">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active" href="/"><strong>Tunr Express</strong></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/artists/">Artists</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/playlist/">Playlists</a>
                </li>
                </ul>
                <a className="nav-item btn btn-outline-primary" href="/signin/">Sign-In</a>
        </nav>)
    }
}

module.exports = NavBar;

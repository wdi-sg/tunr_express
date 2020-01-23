var React = require("react");

class NavBar extends React.Component {
    render() {

        let logInDisplay;
        if (this.props.loggedIn) { logInDisplay =  <a className="nav-item btn btn-outline-primary" href="/logout/">Log Out</a>
        } else {
          logInDisplay = <span><a className="nav-item btn btn-primary" href="/register">Register</a> <a className="nav-item btn btn-outline-primary" href="/signin/">Sign-In</a></span>
        }
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
                {logInDisplay}
        </nav>)
    }
}

module.exports = NavBar;

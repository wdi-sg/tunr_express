var React = require("react");

class NavBar extends React.Component {
    render() {
        return (<nav>
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active" href="/">Tunr Express</a>
                </li>
            </ul>
        </nav>)
    }
}

module.exports = NavBar;

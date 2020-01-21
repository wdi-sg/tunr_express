var React = require("react");

class NavBar extends React.Component {
    render() {
        return (<nav>
            <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link active" href="/">Tunr Express</a>
                </li>
            </ul>
        </nav>)
    }
}

module.exports = NavBar;

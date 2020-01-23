var React = require("react");
var Head = require("./head");
var Navbar = require("./navbar")


class Home extends React.Component {
    render() {
        return (
            <html>
                <Head />
                <body>
                    <div className="container">
                        <Navbar />
                        <h1>Welcome to Tunr Databass!</h1>
                        <ul>
                            <li><a href="/artists">Artists</a></li>
                            <li><a href="/songs">Songs</a></li>
                            <li><a href="/playlists">Playlists</a></li>
                        </ul>
                        <form action="/users/logout?_method=delete" method="POST">
                            <button>
                                logout
                            </button>
                        </form>
                    </div>
                </body>
            </html>
        );
    }
}

module.exports = Home;

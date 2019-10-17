const React = require('react');

class Layout extends React.Component {
    render() {
        return (
           <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                    <title>Tunr</title>
                </head>
                <body>
                    <div className="container">

                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <span className="navbar-brand">Tunr</span>
                            <ul className="nav mr-auto mt-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000/artists/">See All Artists</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000/artists/new">New Artist</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000/playlists">See All Playlist</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000/playlists/new">New Playlist</a>
                                </li>
                            </ul>
                            <form className="form-inline my-2 my-lg-0" method="GET" action={"/login"}>
                                <input className="btn btn-outline-success my-2 my-sm-0" type="submit" value="Log In"/>
                            </form>
                            <form className="form-inline my-2 my-lg-0" method="GET" action={"/register"}>
                                <input className="btn btn-outline-success my-2 my-sm-0" type="submit" value="Register"/>
                            </form>
                        </nav>

                        <div className="jumbotron">
                            {this.props.children}
                        </div>

                    </div>
                </body>
            </html>
        );
    };
};

module.exports = Layout;
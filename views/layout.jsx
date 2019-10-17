const React = require('react');

class Layout extends React.Component {
    render() {
        return (
           <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
                    <title>bnana.</title>
                </head>
                <body>
                    <div className="container">

                        <nav className="navbar navbar-expand-lg navbar-dark" style = {{backgroundColor: "#6e6565"}}>
                            <span className="navbar-brand">bnana.</span>
                            <ul className="nav mr-auto mt-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000/favorites">Favorites</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="http://localhost:3000/bananas">SUPER SECRET</a>
                                </li>
                            </ul>

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
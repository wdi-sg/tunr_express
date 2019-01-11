var React = require ('react');

class DefaultLayout extends React.Component {
    render() {
        return(
            <html>
                <head>

                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous"/>
                <link rel="stylesheet" type="text/css" href="/style.css"/>

                </head>
                <body>

                    <nav>
                        <ul className="nav justify-content-center top-nav">
                          <li className="nav-item">
                            <a className="nav-link active" href="/artists/">Home</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/songs/">All Songs</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                          </li>
                        </ul>
                    </nav>
                    <div className="container-fluid mt-3">
                    {this.props.children}
                    </div>

                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossOrigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>

                </body>
            </html>
        )
    }
}

module.exports =DefaultLayout;
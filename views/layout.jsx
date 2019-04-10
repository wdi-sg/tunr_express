var React = require('react');

class Layout extends React.Component {
    render() {
        return (
            <html>
                <head>

                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
                    <link rel="stylesheet" href="/style.css"></link>

                </head>

                <body>
                    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
                      <a class="navbar-brand" href="/">Tunr!</a>
                      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </button>

                      <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                          <li class="nav-item">
                            <a class="nav-link" href="/artist/new">Add Artist</a>
                          </li>

                          <li class="nav-item">
                            <a class="nav-link" href="/songs/new">Add Song</a>
                          </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                      </div>
                    </nav>

{/*                    <div class="main-container">*/}
                        {this.props.children}
{/*                    </div>*/}


                </body>
            </html>
        ) // end of return
    }  // end of rendering
}  // end of layout

module.exports = Layout;
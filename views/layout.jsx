var React = require('react');

class layout extends React.Component {
  render() {
return(
        <html>
            <head>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>
            </head>
                <body>
                    <header>
                        <ul class="nav justify-content-center">
                            <li class="nav-item">
                                <a class="nav-link" href="/">HOME</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">SORT</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/playlist">PLAYLIST</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>
                            <form class="form-inline my-2 my-lg-0" method = "POST" action = "/recipe/search?method=get">
                              <input class="form-control mr-sm-2" type="search" placeholder="Search" name="search" aria-label="Search"/>
                              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </ul>
                    </header>
                    <div>
                        <h1 class ="display-1 text-center">TUNR 1.0!</h1>
                    </div>
                    <div class = "container-fluid">
                    {this.props.children}
                    </div>
                </body>
        </html>
        );
    }
}

module.exports = layout;
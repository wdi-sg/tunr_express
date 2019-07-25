var React = require('react');

class Layout extends React.Component {
  render() {
    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"/>

            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"></script>
            <link rel="stylesheet" href="/style.css"></link>
        </head>
        <body>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">




                <ul className="navbar-nav mr-auto">



                  <li className="nav-item active">
                    <a className="nav-link" href="/">Artist Index<span className="sr-only">(current)</span></a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/artist/new">Input an artist</a>
                  </li>

                  <form className="form-inline my-2 my-lg-0" method="GET" action="/artist/edit">
                      <input className="form-control mr-sm-2" name="edit" type="search" placeholder="Edit artist by ID" aria-label="Search"/>
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Edit artist</button>
                  </form>



                  <form className="form-inline my-2 my-lg-0" method="POST" action="/artist/delete?_method=DELETE">
                      <input className="form-control mr-sm-2" name="delete" type="search" placeholder="Delete artist by ID" aria-label="Search"/>
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Delete artist by ID</button>
                  </form>

                  <form className="form-inline my-2 my-lg-0" method="GET" action="/artist">
                  <input className="form-control mr-sm-2" name="search" type="search" placeholder="Search artists by ID" aria-label="Search"/>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>

                <form className="form-inline my-2 my-lg-0" method="GET" action="/artist/songs">
                  <input className="form-control mr-sm-2" name="search" type="search" placeholder="Search songs by artist" aria-label="Search"/>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                <form className="form-inline my-2 my-lg-0" method="GET" action="/artist/songs/new">
                      <input className="form-control mr-sm-2" name="create" type="search" placeholder="Create song for an artist" aria-label="Search"/>
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Create song</button>
                  </form>
                  <li className="nav-item">
                    <a className="nav-link" href="/register">Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/login">Log in</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout?_method=PUT">Log out</a>
                  </li>



                </ul>


              </div>
            </nav>


            <div className="row mainwrapper my-sm-2 my-lg-4 mx-auto">
                <div className="col col-lg-9 offset-lg-2 col-sm-12 main">
                {this.props.children}
                </div>
            </div>

        </body>
      </html>
    );
  }
}


module.exports = Layout;
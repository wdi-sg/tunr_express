var React = require('react');
class ShowOne extends React.Component {
  render() {

    const Navbar = require("./navbar.jsx");

    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
            <link rel="stylesheet" href="/style.css"></link>
        </head>
        <body>
        <Navbar/>

        <main>
          <div>
            <h1 className="col-md-auto display-4">Artist #{this.props.id}</h1>
                <div className="cards">
                    <div className="card">
                        <img src={this.props.photo_url} className="card-img-top" alt="artists_image"/>
                          <div className="card-body">
                            <h5 className="card-title">{this.props.name}</h5>
                            <p className="card-text">{this.props.nationality}</p>
                            <form method='GET' action={'/artists/'+this.props.id+"/songs"}>
                                <button class="btn btn-dark">Songs by {this.props.name}</button>
                            </form>
                            <br/>
                            <form method='GET' action={'/artists/'+this.props.id+"/edit"}>
                                <button class="btn btn-dark">Edit Artists</button>
                            </form>
                            <br/>
                            <a class="btn btn-dark" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                                Delete Artist
                            </a>
                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">
                                    <p>Are you sure you want to delete this recipe? This will permanently remove the recipe from the database.</p>
                                    <form method='POST' action={'/artists/'+this.props.id+"?_method=delete"}>
                                        <button class="btn btn-dark">Yes delete permanently</button>
                                    </form>
                                </div>
                            </div>
                          </div>
                    </div>
                </div>
          </div>
        </main>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = ShowOne;
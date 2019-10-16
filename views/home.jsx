var React = require("react");

class Home extends React.Component {
  render() {

    const Navbar = require("./navbar.jsx");

    let artist = this.props.artists.map(x=>{
        var id = x.id;
        var name = x.name;
        var photo = x.photo_url;
        var nationality = x.nationality;

    return  <div className="card">
                <img src={photo} className="card-img-top" alt="artists_image"/>
                  <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{nationality}</p>
                    <a href={'/artists/'+id} className="btn btn-dark">See More!</a>
                  </div>
            </div>
});


    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
            <link rel="stylesheet" href="/style.css"></link>
        </head>
        <body>
        <Navbar/>
          <div>
          <h1 className="col-md-auto display-4">Our Artists</h1>
            <div className="cards">
                {artist}
            </div>
          </div>

        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Home;
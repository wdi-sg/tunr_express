

var React = require('react');
class showAll extends React.Component {
  render() {

    var everything = this.props.artists.map(x=>{
        var name = x.name;
        var photo_url = x.photo_url;
        var nationality = x.nationaity;

        return <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src={photo_url} alt="Card image cap">
                    <div class="card-body">
                    <h5 class="card-title">{name}</h5>
                    <p class="card-text">{nationality}</p>
              </div>

    });
​
​      return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossOrigin="anonymous"></link>
            <link rel="stylesheet" href="/style.css"></link>
        </head>
        <body>
​
        <main>
          <div>
              <h1 className="col-md-auto display-4">This Is All The Artists!</h1>
              {everything}
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
​
module.exports = showAll;
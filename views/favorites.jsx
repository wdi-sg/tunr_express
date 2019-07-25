var React = require("react");

class favorites extends React.Component {
  render() {

    const songs = this.props.songs.map(element => {
      return(<div className="media mb-3 row">
                <img src={element.artwork} className="mr-3" alt="..." style={{maxHeight: 100}}/>
                <div className="col-8 media-body border-bottom">
                    <h5 className="mt-0">{element.title}</h5>
                    <p>Album: {element.album}</p>
                </div>
                 <div className="col-4 form-check border-bottom pb-4 mt-4">
                    <input className="form-check-input" name="favorites" type="checkbox" value={element.id} id="defaultCheck1"/>
                    <label className="form-check-label" for="defaultCheck1">
                        Add to Favorites
                    </label>
                </div>
              </div>)
    });

    return (
      <html>
        <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css?family=Lora&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"></link>
        </head>

        <body style={{backgroundImage : 'url("https://wallpaperaccess.com/full/646093.png")', backgroundPosition : "center", backgroundRepeat : "no-repeat", backgroundSize : "cover", height : "100vh", backgroundAttachment : "fixed"}}>

        <div className="container mx-auto">
                <h1 className="text-center my-5" style={{fontFamily : "Lora, serif", color:'white'
}}>Song List</h1>
            <div className = "row mt-3" style={{ justifyContent : "center" }}>
                <div className="card text-center">
                  <div className="card-body">
                    <form method="POST" action="/playlist">
                        <button type="submit" class="btn btn-primary" style={{ position: 'fixed',
    right: '150px'}}>Submit</button>
                        {songs}
                    </form>
                  </div>
                </div>
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

module.exports = favorites;
var React = require("react");

class songList extends React.Component {
  render() {

    const song = this.props.songs.map(element => {
      return(<div class="media">
                <img src={element.artwork} class="mr-3" alt="..."/>
                <div class="media-body">
                <h5 class="mt-0">{element.title}</h5>
                <p>Album: {element.album}</p>
                </div>
              </div>)
    });

    return (
      <html>
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link href="https://fonts.googleapis.com/css?family=Lora&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"></link>
        </head>

        <body style={{backgroundImage : 'url("https://wallpaperaccess.com/full/646093.png")', backgroundPosition : "center", backgroundRepeat : "no-repeat", backgroundSize : "cover", height : "100vh", backgroundAttachment : "fixed"}}>

        <div className="container mx-auto">
                <h1 className="text-center my-5" style={{fontFamily : "Lora, serif", color:'white'
}}>Song List</h1>
            <div className = "row mt-3" style={{ justifyContent : "center" }}>
                <div className="card text-center">
                  <div className="card-header">
                    {this.props.artist.name}
                  </div>
                  <div className="card-body">
                    {song}
                    <a href={"/artists/"+this.props.artist.id} className="btn btn-primary mr-3">Back to Artist</a>
                    <a href={"/artists/"+this.props.artist.id+"/songs/new"} className="btn btn-success mr-3">Add New Song</a>
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

module.exports = songList;
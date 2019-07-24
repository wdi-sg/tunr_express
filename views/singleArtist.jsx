var React = require("react");

class singlePage extends React.Component {
  render() {
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
}}>{this.props.artist.name}</h1>
            <div className = "row mt-3" style={{ justifyContent : "center" }}>
                <div className="card text-center">
                  <div className="card-header">
                    Featured Artist
                  </div>
                  <div className="card-body">
                    <img className="card-img-top" src={this.props.artist.photo_url} alt="Card image cap" style={{ maxWidth : 600 }}/>
                    <p className="card-text mt-4">{this.props.artist.info}</p>
                    <a href={"/artists/"+this.props.artist.id+"/edit"} className="btn btn-info mr-3">Edit Artist</a>
                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal">Delete Artist</button>

                    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Warning!</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <p className="">Are you sure you want to delete this artist?</p>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <form method="POST" action={"/artists/"+ this.props.artist.id+"?_method=delete"}>
                                    <input type="submit" className="btn btn-danger mr-3" value="Delete Artist"/>
                                </form>
                              </div>
                            </div>
                          </div>
                    </div>

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

module.exports = singlePage;
var React = require("react");

class editform extends React.Component {
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
}}>Edit Artist Details</h1>
            <div className = "row mt-3" style={{ justifyContent : "center" }}>
                <div className="card">
                  <div className="card-body">
                    <img className="card-img-top" src={this.props.artist.photo_url} alt="Card image cap" style={{ maxWidth : 600 }}/>
                    <form method="POST" action={"/artists/" + this.props.artist.id + "?_method=PUT"} >
                            <div class="form-group formSize mt-2">
                                <label for="inputTitle">Name</label>
                                <input type="text" name="name" class="form-control" id="inputName" defaultValue={this.props.artist.name}/>
                            </div>

                            <div class="form-group formSize">
                                <label for="inputDescription">Image Url</label>
                                <input type="text" name="photo_url" class="form-control" id="inputImg" defaultValue={this.props.artist.photo_url}/>
                            </div>

                            <div class="form-group formSize">
                                <label for="inputIngredients">Nationality</label>
                                <textarea class="form-control" name="nationality" id="inputNationality" defaultValue={this.props.artist.nationality}></textarea>
                            </div>

                            <div class="form-group formSize">
                                <label for="inputInstructions">Short Description</label>
                                <textarea class="form-control" name="info" id="inputDescription" rows="3" defaultValue={this.props.artist.info}></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary">Submit</button>
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

module.exports = editform;
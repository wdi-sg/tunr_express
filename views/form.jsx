
var React = require('react');

class Form extends React.Component {
  render() {
    return (
      <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
            <link href="https://fonts.googleapis.com/css?family=Lora|Roboto&display=swap" rel="stylesheet"></link>
        </head>
        <body style={{backgroundImage : 'url("https://wallpaperaccess.com/full/646093.png")', backgroundPosition : "center", backgroundRepeat : "no-repeat", backgroundSize : "cover", height : "100vh", backgroundAttachment : "fixed"}}>


          <div className = "container mx-auto">
            <h1 className="text-center my-5 text-white" style={{fontFamily : "Lora, serif"}}>Enter Details of New Artist</h1>
            <form method="POST" action="/artists">

                <div class="form-group formSize text-white">
                    <label for="inputTitle">Name</label>
                    <input type="text" name="name" class="form-control" id="inputName" />
                </div>

                <div class="form-group formSize text-white">
                    <label for="inputDescription">Image Url</label>
                    <input type="text" name="photo_url" class="form-control" id="inputImg" />
                </div>

                <div class="form-group formSize text-white">
                    <label for="inputIngredients">Nationality</label>
                    <textarea class="form-control" name="nationality" id="inputNationality"></textarea>
                </div>

                <div class="form-group formSize text-white">
                    <label for="inputInstructions">Short Description</label>
                    <textarea class="form-control" name="info" id="inputDescription" rows="3"></textarea>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>

            </form>
          </div>

          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Form;
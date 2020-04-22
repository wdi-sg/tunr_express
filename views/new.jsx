var React = require("react");

class New extends React.Component {
  render() {

    return (
      <html>
      <head>
      <link rel="stylesheet" href="style.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
        </head>
        <body>
        <div class="jumbotron">
              <h1 class="display-4">Add New Artist</h1>
            </div>
            <div>
                <form method="POST" action="/artists">
                  <div class="form-group new-artist">
                    <label for="exampleInputEmail1">Artist Name</label>
                    <input type="text" name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div class="form-group new-artist">
                    <label for="exampleInputPassword1">Photo URL</label>
                    <input type="text" name="photo_url" class="form-control" id="exampleInputPassword1"/>
                  </div>
                  <div class="form-group new-artist">
                    <label for="exampleInputPassword1">Nationality</label>
                    <input type="text" name="nationality" class="form-control" id="exampleInputPassword1"/>
                  </div>
                  <div>
                  <button type="submit" className="new-artist-button">Submit</button>
                  </div>
                  </form>
                  </div>
            </body>
            </html>
    );
  }
}

module.exports = New;
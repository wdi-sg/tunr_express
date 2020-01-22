var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
        </head>
        <body>
          <h3>Form Goes Here!</h3>
            <form action = "/artists" method="POST">
              <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" name="name"></input>
              </div>
              <div class="form-group">
                <label>Photo URL</label>
                <input type="text" class="form-control" name="photo_url"></input>
              </div>
              <div class="form-group">
                <label>Nationality</label>
                <input type="text" class="form-control" name="nationality"></input>
              </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

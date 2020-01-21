var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
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

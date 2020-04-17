var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Form Goes Here!</h3>
            <form method="POST" action="/artists">
                <p>Name</p>
                <input type="text" name="name"/>
                <p>Photo</p>
                <input type="text" name="photo_url"/>
                <p>Nationality</p>
                <input type="text" name="nationality"/>
                <br></br>
                <input type="submit"/>
            </form>


        </body>
      </html>
    );
  }
}

module.exports = New;
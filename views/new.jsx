var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h1>New Artist Onboarding!</h1>
          <form method = "POST" action = "/artist">
            <h3>Artist's Name</h3>
            <input name = "name"/>
            <h3>Artist's Photo URL</h3>
            <input photo_url = "photo_url"/>
            <h3>Artist's Nationality</h3>
            <input nationality = "nationality"/>
            <br></br>
            <input type = "submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
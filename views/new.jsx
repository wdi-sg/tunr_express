var React = require("react");
// Adding of new Artists
class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Adding a New Artist</h3>
        <form method="POST" action="/artist">
            Artist Name: <input name = "name" placeholder="Name"/> <br/>
            Photo URL: <input name = "photo_url" placeholder="Photo URL"/> <br/>
            Nationality: <input name = "nationality" placeholder="Nationality"/> <br/><br/>
             <a href='/artists'><input type = "submit" /> </a>
        </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

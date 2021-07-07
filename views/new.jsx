var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <form action = "/artists" method = "POST">
          NAME<br/><input name ="name"></input><br/>
          PHOTO_URL<br/><input name ="photo_url"></input><br/>  
          Nationality<br/><input name ="nationality"></input><br/>
          <input type="submit"></input>
          </form>
          </body>
      </html>
    );
  }
}

module.exports = New;

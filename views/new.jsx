var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <body>
        <div>
        <h1>New Artist</h1>
        <form action="/artist" method="POST">
        <p>Name :</p><input type="text" name="name" required/><br/>
        <p>Photo_url :</p><input type= "text" name="photo_url" required/><br/>
        <p>Nationality :</p><input type="text" name="nationality" required/><br/>
        <br/><input type="submit" value="Submit"/>
        </form>
        </div>
        </body>
      </html>
    )
  }
}

module.exports = New;
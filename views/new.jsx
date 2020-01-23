var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <title>Add New Artist</title>
        <head/>
        <body>
          <h3>Submit Artist</h3>
          <form action="/artists" method="POST">
            <p> Name: <input name ="name" type = "text" placeholder = "Artist Name"/> </p>
            <p> Photo Link: <input name ="photo_url" type = "text" placeholder = "Artist Photo Link"/> </p>
            <p> Nationality: <input name ="nationality" type = "text" placeholder = "Nationality"/> </p>
            <input type = "Submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

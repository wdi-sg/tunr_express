var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Add a new Artist to the TUNR!</h3>
          <form method="POST" action="/new">
                Artist Name: <input name="name" type="text" placeholder="Bruno Mars"/><br/>
                <br/>
                Photo: <input name="photo_url" type="text" placeholder="http:// ... .jpg"/><br/>
                <br/>
                Nationality: <input name="nationality" type="text" placeholder="Russian??"/><br/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
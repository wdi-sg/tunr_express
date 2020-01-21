var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <h3>Add new artist!</h3>
            <form action="/tunr" method="POST">
                <div>Name</div><input name="name"/><br/>
                <div>Photo URL</div><input name="photo_url"/><br/>
                <div>Nationality</div><input name="nationality"/><br/>
                <input type="submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Add New Artist</h3>
          <form method='POST' action='/artists'>
            <h4>Name</h4>
            <input type='text' name='name'/>
            <h4>Photo URL</h4>
            <input type='text' name='photo_url'/>
            <h4>Nationality</h4>
            <input type='text' name='nationality'/>
            <br/><br/>
            <input type='submit' value='Submit'/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
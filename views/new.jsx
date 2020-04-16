var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <p>Add New</p>
          <form method='POST' action='/artists'>
            <p>Name</p>
            <input type='text' name='name'/>
            <p>Photo URL</p>
            <input type='text' name='photo_url'/>
            <p>Nationality</p>
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

var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>New Artist</h3>
          <form action="/artist" method="POST">
        	<input type="text" name="name" placeholder = "Name"/>
          <input type="text" name="photo_url" placeholder = "Image URL" />
          <input type="text" name="nationality" placeholder = "nationality"/>
        	<input type="submit"/>
        </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

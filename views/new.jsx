var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
        <form action="/artists" method="POST">
            <input type="text" name="name" placeholder="name"/>
            <input type="text" name="photo_url" placeholder="photo url"/>
            <input type="text" name="nationality" placeholder="nationality"/>
            <input type="submit"/>
          </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

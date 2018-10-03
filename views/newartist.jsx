var React = require("react");

class newartist extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <div>
            <h1>New Artist</h1>
            <form action="/artists" method="POST">
                <input type="text" name="name" placeholder="name"/><br/>
                <input type="text" name="photo_url" placeholder="photo_url"/><br/>
                <input type="text" name="nationality" placeholder="nationality"/><br/>
                <input type="submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = newartist;

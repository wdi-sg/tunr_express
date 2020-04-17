var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
            <form method="POST" action="/artistNew">
                Name:
                <input type="text" name="name"/><br/>
                Photo_url:
                <input type="text" name="photo_url"/><br/>
                Nationality:
                <input type="text" name="nationality"/><br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
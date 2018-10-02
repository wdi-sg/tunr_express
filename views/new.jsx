var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Create new artist</h3>
          <form method="POST" action='/artists'>
                <p>Name of artist: </p>
                <input name="name" />
                <p>Photo URL of artist: </p>
                <input name="url" />
                <p>Nationality of artist</p>
                <input name="nationality" />
                <br/>
                <input type="submit" />
            </form>
        </body>
      </html>
    );
  }
}

module.exports = New;

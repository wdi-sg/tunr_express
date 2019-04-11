var React = require("react");

class Add extends React.Component {
  render() {
    return (
        <html>
        <body>
            <form method="POST" action="/artist">
              <h3>Add your favorire artist🎤</h3>
                IMAGE: <input type="text" name="photo_url"/>
                <br/>
                NAME: <input type="text" name="name"/>
                <br/>
                NATIONALITY: <input type="text" name="nationality"/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </body>
        </html>
    );
  }
}

module.exports = Add;
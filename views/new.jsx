var React = require('react');
class New extends React.Component {
  render() {
    return (
      <html>
        <body>
                  <div>
                  { this.props.warning }

            <h1>Add a New Artist</h1>
            <form method="POST" action="/artists">
            <br/>
            Name: <input type="text" name="name"/>
            <br/>
            PhotoURL: <input type="text" name="photo_url"/>
            <br/>
            Nationality: <input type="text" name="nationality"/>
            <br/>
            <input type="submit" value="Submit"/>
            </form>


          </div>
        </body>
      </html>
    );
  }
}

module.exports = New;
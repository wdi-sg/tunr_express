var React = require("react");

class New extends React.Component {
  render() {
    console.log('display form');
    return (
      <html>
        <head />
        <body>
          <h3>List a new artist</h3>
            <form action="/artist/new" method="POST">
                Name: <input type="text" name="name"/><br/>
                Url of photo: <input type="text" name="photo_url"/><br/>
                Nationality: <input type="text" name="nationality"/><br/>
                <input type="submit" value="Save"/>
             </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
var React = require("react");

class New extends React.Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <h3>Add A New Artist!</h3>
           <form action="/artist" method="POST">
                        <p>Name Of Artist:</p>
                      <input type="text" name="name"/><br/>
                        <p>URL Of Photo:</p>
                      <input type="text" name="photo_url"/><br/>
                        <p>Nationality:</p>
                      <input type="text" name="nationality"/><br/>
                      <input type="submit" value="Submit" placeholder="Search!!"/>
                </form>
        </body>
      </html>
    );
  }
}

module.exports = New;
